import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";


import Patient from "../models/Patient.js";


export const createAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot } = req.body;

    // 1️⃣ Find patient profile using logged-in user
    const patient = await Patient.findOne({ userId: req.user._id });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    // 2️⃣ Create appointment with PATIENT PROFILE ID
    const appointment = await Appointment.create({
      patientId: patient._id,   // ✅ CORRECT
      doctorId,
      appointmentDate,
      timeSlot
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error("🔥 Appointment error:", error);
    res.status(500).json({ message: "Appointment booking failed" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user._id
    }).populate({
      path: "doctorId",
      populate: { path: "userId" }
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments"
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId")
      .populate({
        path: "doctorId",
        populate: { path: "userId" }
      });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments"
    });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    // find doctor profile using logged-in user
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const appointments = await Appointment.find({
      doctorId: doctor._id
    })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email"
        }
      });

    console.log("POPULATED APPOINTMENTS:", appointments); // 🔥 MUST LOG

    res.json(appointments);
  } catch (error) {
    console.error("Doctor appointments error:", error);
    res.status(500).json({
      message: "Failed to fetch doctor appointments"
    });
  }
};

export const markAppointmentCompleted = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "completed";
    await appointment.save();

    res.json({ message: "Appointment marked as completed" });
  } catch (error) {
    console.error("Mark complete error:", error);
    res.status(500).json({
      message: "Failed to mark appointment completed"
    });
  }
};
