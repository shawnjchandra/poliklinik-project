import express from "express";
import { registerPasien } from "../controllers/pasien.js";
import { loginPasien } from "../controllers/pasien.js";
import { hashedPassword } from "../utils/encryptPassword.js";

const   router = express.Router();

router.post("/register", registerPasien);

router.post("/login", loginPasien);

// router.post("/hash", hashedPassword);

export default router;
