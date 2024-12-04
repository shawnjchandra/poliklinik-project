import express from "express";
import { createJadwalPraktik, updateJadwalPraktik } from "../controllers/jadwalPraktik.js";

const router = express.Router();

router.post("/", createJadwalPraktik);

router.patch("/:id", updateJadwalPraktik);

// router.post("/inject", isPasswordInjection );

export default router;
