import express from "express";
import { createJadwalPraktik, getJadwalPraktik, updateJadwalPraktik } from "../controllers/jadwalPraktik.js";
import { validateCreateJadwalPraktik } from "../middleware/validator/jadwal-praktik.js";

const router = express.Router();

router.post("/", validateCreateJadwalPraktik, createJadwalPraktik);

router.get("/:id_pegawai", getJadwalPraktik);

router.patch("/:id", updateJadwalPraktik);

// router.post("/inject", isPasswordInjection );

export default router;
