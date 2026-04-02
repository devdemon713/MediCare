import express from "express";
import { registerUser, registerAdmin, loginUser } from "../controllers/authController.js";

const router = express.Router();

// register
router.post("/register", registerUser);

// register admin (bootstrap via secret OR via existing admin token)
router.post("/register-admin", registerAdmin);

// login
router.post("/login", loginUser);

export default router;
