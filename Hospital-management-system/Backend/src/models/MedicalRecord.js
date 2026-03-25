import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    diagnosis: {
      type: String,
      required: true
    },
    prescription: {
      type: String,
      required: true
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("MedicalRecord", medicalRecordSchema);
