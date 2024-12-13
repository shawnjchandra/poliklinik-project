import express from "express";
import { validateLogin, validateRegisterDokter, validateRegisterPegawai } from "../middleware/validator/pegawai.js";
import { getAllDokter, getDokterById, loginPegawai, registerDokter, registerPegawai } from "../controllers/pegawai.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/register/dokter", validateRegisterDokter, registerDokter);

//tambahin pegawai
router.post("/register", authMiddleware(["sis-admin"]), validateRegisterPegawai, registerPegawai);

router.post("/login", validateLogin, loginPegawai);

router.get("/dokter/", getAllDokter);

// spesifik get detail 1 dokter
router.get("/dokter/:id_pegawai", getDokterById);

export default router;
