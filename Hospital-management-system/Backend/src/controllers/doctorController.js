import bcrypt from "bcryptjs";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
export const createDoctor = async (req, res) => {
  try {
    const { userId, specialization, availableDays, consultationFee } = req.body;

    // 1. check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // 2. check role
    if (user.role !== "doctor") {
      return res.status(400).json({
        message: "User is not a doctor"
      });
    }

    // 3. check if doctor profile already exists
    const existingDoctor = await Doctor.findOne({ userId });
    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor already exists"
      });
    }

    // 4. create doctor profile
    const doctor = await Doctor.create({
      userId,
      specialization,
      availableDays,
      consultationFee
    });

    res.status(201).json({
      message: "Doctor created successfully",
      doctor
    });

  } catch (error) {
    console.error("Doctor creation error:", error);
    res.status(500).json({
      message: "Doctor creation failed"
    });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const showInactive = req.query.inactive === "true";

    // 🔥 TEMP: DO NOT FILTER ROLE
    const users = await User.find({
      isActive: showInactive ? false : true
    });

    console.log("USERS FOUND:", users); // 🔥 VERY IMPORTANT

    const userIds = users.map(u => u._id);

    const doctors = await Doctor.find({
      userId: { $in: userIds }
    }).populate("userId");

    res.json(doctors);
  } catch (error) {
    console.error("getDoctors error:", error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

export const createDoctorWithUser = async (req, res) => {
  try {
    const { name, email, password, specialization, consultationFee } = req.body;

    // 1. check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Doctor already exists with this email"
      });
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "doctor"
    });

    // 4. create doctor profile
    const doctor = await Doctor.create({
      userId: user._id,
      specialization,
      consultationFee
    });

    res.status(201).json({
      message: "Doctor created successfully",
      doctor
    });

  } catch (error) {
    console.error("Create doctor error:", error);
    res.status(500).json({
      message: "Doctor creation failed"
    });
  }
};

export const deactivateDoctor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: "Doctor deactivated successfully" });
  } catch (error) {
    console.error("Deactivate doctor error:", error);
    res.status(500).json({ message: "Failed to deactivate doctor" });
  }
};

export const restoreDoctor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = true;
    await user.save();

    res.json({ message: "Doctor restored successfully" });
  } catch (error) {
    console.error("Restore doctor error:", error);
    res.status(500).json({ message: "Failed to restore doctor" });
  }
};


export const getInactiveDoctors = async (req, res) => {
  try {
    const inactiveUsers = await User.find({
      role: "doctor",
      isActive: false
    });

    const userIds = inactiveUsers.map(u => u._id);

    const doctors = await Doctor.find({
      userId: { $in: userIds }
    }).populate("userId");

    res.json(doctors);
  } catch (error) {
    console.error("Get inactive doctors error:", error);
    res.status(500).json({ message: "Failed to fetch inactive doctors" });
  }
};