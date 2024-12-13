import express, { Router } from "express";
import { createNewRekamMedis, getDiagnosisRekamMedis, getInformasiDasar, updateDiagnosaPasien, updateInformasiDasar } from "../controllers/rekmedis.js";

const router = express.Router();

router.post("/:id_pasien", createNewRekamMedis);

router.get("/informasi-dasar/:id_rkm_med", getInformasiDasar);

router.post("/informasi-dasar/:id_rkm_med", updateInformasiDasar);

router.post("/diagnosis/:id_rkm_med", updateDiagnosaPasien);

router.get("/diagnosis/:id_rkm_med", getDiagnosisRekamMedis);

export default router;
