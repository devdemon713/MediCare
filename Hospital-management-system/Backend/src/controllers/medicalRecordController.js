import MedicalRecord from "../models/MedicalRecord.js";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";

/*
  DOCTOR: create medical record
*/
export const createMedicalRecord = async (req, res) => {
  try {
    const { appointmentId, diagnosis, prescription, notes } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // find doctor profile using logged-in user
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const record = await MedicalRecord.create({
      appointmentId,
      doctorId: doctor._id,
      patientId: appointment.patientId,
      diagnosis,
      prescription,
      notes
    });

    res.status(201).json({
      message: "Medical record added successfully",
      record
    });
  } catch (error) {
    console.error("Medical record error:", error);
    res.status(500).json({
      message: "Failed to add medical record"
    });
  }
};

/*
  PATIENT: view own medical records
*/
export const getMyMedicalRecords = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user._id });
      
    console.log("LOGGED IN USER ID:", req.user._id);
    console.log("PATIENT PROFILE ID:", patient?._id);

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const records = await MedicalRecord.find({
      patientId: patient._id
    });

    console.log("RECORDS FOUND:", records);

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch medical records" });
  }
};
