import express from "express";
import {
  createJadwalPraktik,
  getAllJadwalPraktik,
  getJadwalPraktik,
  deleteJadwalPraktik,
} from "../controllers/jadwalPraktik.js";
import { validateCreateJadwalPraktik } from "../middleware/validator/jadwal-praktik.js";

const router = express.Router();

router.post("/", validateCreateJadwalPraktik, createJadwalPraktik);

router.get("/", getAllJadwalPraktik);
router.get("/:id_pegawai", getJadwalPraktik);

router.delete("/:id_jadwal", deleteJadwalPraktik);

// router.post("/inject", isPasswordInjection );

export default router;
