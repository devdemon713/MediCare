import express from "express";
import {
  createMedicalRecord,
  getMyMedicalRecords
} from "../controllers/medicalRecordController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { get } from "http";

const router = express.Router();

// doctor adds medical record
router.post(
  "/",
  protect,
  authorizeRoles("doctor"),
  createMedicalRecord
);

// patient views own medical records
router.get(
  "/my",
  protect,
  authorizeRoles("patient"),
  getMyMedicalRecords
);

export default router;
