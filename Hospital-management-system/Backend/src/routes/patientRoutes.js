import express from "express";
import {
  createPatient,
  getPatients,
  deactivatePatient,
  restorePatient
} from "../controllers/patientController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin or receptionist can add patient
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createPatient
);

// admin can view all patients
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getPatients
);

router.put(
  "/:id/deactivate",
  protect,
  authorizeRoles("admin"),
  deactivatePatient
);

router.put(
  "/:id/restore",
  protect,
  authorizeRoles("admin"),
  restorePatient
);

export default router;
