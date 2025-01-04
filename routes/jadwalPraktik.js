import express from "express";
import { createJadwalPraktik, getAllJadwalPraktik, getJadwalPraktik, deleteJadwalPraktik } from "../controllers/jadwalPraktik.js";
import { validateCreateJadwalPraktik } from "../middleware/validator/jadwal-praktik.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// membuat jadwal praktik
router.post("/", authMiddleware(["pet-admin"]), validateCreateJadwalPraktik, createJadwalPraktik);

router.get("/", getAllJadwalPraktik);

// get spesifik jadwal dokter
router.get("/:id_pegawai", getJadwalPraktik);

router.delete("/:id_jadwal", authMiddleware(["pet-admin"]), deleteJadwalPraktik);

// router.post("/inject", isPasswordInjection );

export default router;
