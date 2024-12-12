import express from "express";
import { addPendaftaranOnline, addPendaftaranOffline, daftarUlang, getPendaftaran, updateStatus } from "../controllers/pendaftaran.js";
const router = express.Router();

router.post("/online", addPendaftaranOnline);

router.post("/offline", addPendaftaranOffline);

router.get("/", getPendaftaran);
// router.get("/pemanggilan", getPendaftaranPemanggilan);

router.post("/daftar-ulang/:id_pendaftaran", daftarUlang);

// router.get("/dokter", getPendaftaranDokter);

// update status pendaftaran ke status dokter
router.post("/status/:id_pendaftaran", updateStatus);

export default router;
