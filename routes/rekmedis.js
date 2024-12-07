import express, { Router } from "express";
import { createNewRekamMedis, updateDiagnosaPasien, updateInformasiDasar } from "../controllers/rekmedis.js";


const router = express.Router();

router.post("/:id_pasien", createNewRekamMedis)

router.post("/:id_pasien/updateID", updateInformasiDasar)

router.post("/:id_pasien/updateDP", updateDiagnosaPasien)

export default router;