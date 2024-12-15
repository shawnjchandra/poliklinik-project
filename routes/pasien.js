import express from "express";
import { getAllPasien, registerPasien } from "../controllers/pasien.js";
import { loginPasien } from "../controllers/pasien.js";
import { validateLogin, validateRegister } from "../middleware/validator/pasien.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerPasien);

router.post("/login", validateLogin, loginPasien);

router.get("/", authMiddleware(["pet-admin", "sis-admin"]), getAllPasien);

// router.post("/inject", isPasswordInjection );

export default router;
