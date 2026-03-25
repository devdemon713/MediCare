import express from "express";
import {
  createAppointment,
  getAppointments,
  getMyAppointments,
  getDoctorAppointments,
  markAppointmentCompleted
} from "../controllers/appointmentController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// PATIENT books appointment
router.post(
  "/",
  protect,
  authorizeRoles("patient"),
  createAppointment
);

// PATIENT views own appointments
router.get(
  "/my",
  protect,
  authorizeRoles("patient"),
  getMyAppointments
);

// ADMIN views all appointments
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAppointments
);

router.get(
  "/doctor",
  protect,
  authorizeRoles("doctor"),
  getDoctorAppointments
);

router.put(
  "/:appointmentId/complete",
  protect,
  authorizeRoles("doctor"),
  markAppointmentCompleted
);


export default router;
