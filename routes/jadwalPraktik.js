import express from "express";
import { createJadwalPraktik, updateJadwalPraktik } from "../controllers/jadwalPraktik.js";
import { validateCreateJadwalPraktik } from "../middleware/validator/jadwal-praktik.js";

const router = express.Router();

router.post("/", validateCreateJadwalPraktik, createJadwalPraktik);

router.patch("/:id", updateJadwalPraktik);

// router.post("/inject", isPasswordInjection );

export default router;
