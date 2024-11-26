import express from "express";
import { registerPasien } from "../controllers/pasien.js";
import { loginPasien } from "../controllers/pasien.js";
import { isPasswordInjection } from "../utils/passwordValidator.js";



const   router = express.Router();

router.post("/register", registerPasien);

router.post("/login", loginPasien);

// router.post("/inject", isPasswordInjection );

export default router;
