
import User from "../models/User.js";
import Patient from "../models/Patient.js";
import bcrypt from "bcryptjs";

export const createPatient = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    // 1. check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Patient already exists with this email"
      });
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "patient"
    });

    // 4. create patient profile
    const patient = await Patient.create({
      userId: user._id,
      age,
      gender
    });

    res.status(201).json({
      message: "Patient created successfully",
      patient
    });

  } catch (error) {
    console.error("Patient creation error:", error);
    res.status(500).json({
      message: "Patient creation failed"
    });
  }
};
export const getPatients = async (req, res) => {
  try {
    // if ?inactive=true is sent, fetch inactive users
    const inactive = req.query.inactive === "true";

    const patients = await Patient.find().populate({
      path: "userId",
      match: inactive
        ? { isActive: false }
        : { isActive: true }
    });

    // remove null populated users
    const filteredPatients = patients.filter(p => p.userId);

    res.json(filteredPatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
};



export const deactivatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await User.findByIdAndUpdate(patient.userId, {
      isActive: false
    });

    res.json({ message: "Patient deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to deactivate patient" });
  }
};

export const restorePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await User.findByIdAndUpdate(patient.userId, {
      isActive: true
    });

    res.json({ message: "Patient restored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to restore patient" });
  }
};