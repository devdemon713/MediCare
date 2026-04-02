import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const getBearerToken = (req) => {
  const header = req.headers.authorization;
  if (!header) return null;
  if (!header.startsWith("Bearer ")) return null;
  return header.split(" ")[1];
};

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(password)) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    if (password.trim().length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      // Public registration must never allow privileged roles.
      role: "patient"
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(password)) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    if (password.trim().length < 8) {
      return res.status(400).json({ message: "Admin password must be at least 8 characters" });
    }

    const adminExists = await User.exists({ role: "admin" });

    // If an admin already exists, only an authenticated admin can create another admin.
    const token = getBearerToken(req);
    if (adminExists) {
      if (!token) {
        return res.status(401).json({ message: "Admin token required to create another admin" });
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        return res.status(401).json({ message: "Not authorized" });
      }

      const requester = await User.findById(decoded.id).select("role isActive");
      if (!requester || !requester.isActive || requester.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
    } else {
      // Bootstrap: allow creating the first admin using a one-time secret.
      const secretFromHeader = req.headers["x-admin-register-secret"];
      const providedSecret = adminSecret || secretFromHeader;

      if (!process.env.ADMIN_REGISTER_SECRET) {
        return res.status(500).json({
          message: "ADMIN_REGISTER_SECRET is not configured on the server"
        });
      }

      if (!isNonEmptyString(providedSecret) || providedSecret !== process.env.ADMIN_REGISTER_SECRET) {
        return res.status(403).json({ message: "Invalid admin registration secret" });
      }
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    // Optionally return a token so the created admin can login immediately.
    const tokenToReturn = signToken(adminUser);

    return res.status(201).json({
      message: "Admin registered successfully",
      token: tokenToReturn,
      user: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role
      }
    });
  } catch (error) {
    console.error("Admin registration failed:", error);
    return res.status(500).json({ message: "Admin registration failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
     
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Account is deactivated. Contact admin."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
   

    const token = signToken(user);

    res.json({
      token,
      role: user.role,
      name: user.name
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
