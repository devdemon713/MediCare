import express from "express";
import {
  createDoctor,
  createDoctorWithUser,
  getDoctors,
  deactivateDoctor,
  restoreDoctor,
  getInactiveDoctors
} from "../controllers/doctorController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
  CREATE DOCTOR (OLD – Postman / backward compatibility)
*/
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createDoctor
);

/*
  CREATE DOCTOR (NEW – frontend)
*/
router.post(
  "/create",
  protect,
  authorizeRoles("admin"),
  createDoctorWithUser
);

/*
  GET ACTIVE DOCTORS
*/
router.get(
  "/",
  protect,
  authorizeRoles("admin", "patient"),
  getDoctors
);

/*
  🔴 GET INACTIVE DOCTORS (MUST COME BEFORE :id)
*/
router.get(
  "/inactive",
  protect,
  authorizeRoles("admin"),
  getInactiveDoctors
);

/*
  RESTORE DOCTOR
*/
router.put(
  "/:id/restore",
  protect,
  authorizeRoles("admin"),
  restoreDoctor
);

/*
  DEACTIVATE DOCTOR
*/
router.put(
  "/:id/deactivate",
  protect,
  authorizeRoles("admin"),
  deactivateDoctor
);

export default router;
