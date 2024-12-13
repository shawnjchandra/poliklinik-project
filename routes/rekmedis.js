import express, { Router } from "express";
import { createNewRekamMedis, getDiagnosisRekamMedis, getInformasiDasar, updateDiagnosaPasien, updateInformasiDasar, getRekamMedisPasien } from "../controllers/rekmedis.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { fileUpload } from "../middleware/fileUpload.js";

const router = express.Router();

// dapetin semua riwayat rekam medis pasien
router.get("/:id_pasien", authMiddleware(["dokter"]), getRekamMedisPasien);

// router.post("/:id_pasien", createNewRekamMedis);

// update single informasi dasar
router.get("/informasi-dasar/:id_rkm_med", authMiddleware(["perawat"]), getInformasiDasar);

// update informasi dasar
router.post("/informasi-dasar/:id_rkm_med", authMiddleware(["perawat"]), fileUpload("./uploads").array("dokumen_rekam_medis"), updateInformasiDasar);

// get single diagnosis + informasi dasar
router.post("/diagnosis/:id_rkm_med", authMiddleware(["dokter"]), updateDiagnosaPasien);

// updae single diagnosis + informasi dasar
router.get("/diagnosis/:id_rkm_med", authMiddleware(["dokter"]), getDiagnosisRekamMedis);

export default router;
