import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import patientRoutes from "./src/routes/patientRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import medicalRecordRoutes from "./src/routes/medicalRecordRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES (VERY IMPORTANT ORDER)
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medical-records", medicalRecordRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Hospital Management Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
