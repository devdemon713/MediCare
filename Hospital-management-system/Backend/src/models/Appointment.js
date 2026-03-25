import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    status: {
      type: String,
      enum: ["booked", "checked-in", "completed", "cancelled"],
      default: "booked"
    },
    appointmentDate: {
  type: Date,
  required: true
},
timeSlot: {
  type: String,
  required: true
}

  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
