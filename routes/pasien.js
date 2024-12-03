import express from "express";
import { registerPasien } from "../controllers/pasien.js";
import { loginPasien } from "../controllers/pasien.js";
import { validateLogin, validateRegister } from "../middleware/validator/pasien.js";

const router = express.Router();

router.post("/register", validateRegister, registerPasien);

router.post("/login", validateLogin, loginPasien);

// router.post("/inject", isPasswordInjection );

export default router;
