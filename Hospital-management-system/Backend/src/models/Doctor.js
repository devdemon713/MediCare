import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    specialization: String,
    availableDays: [String],
    consultationFee: Number
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
