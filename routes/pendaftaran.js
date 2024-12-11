import express from "express";
import { addPendaftaranOnline, addPendaftaranOffline, daftarUlang, getPendaftaranOnline, getPendaftaranPemanggilan, getPendaftaranDokter } from "../controllers/pendaftaran.js";
const router = express.Router();

router.post("/online", addPendaftaranOnline);

router.post("/offline", addPendaftaranOffline);

router.get("/online", getPendaftaranOnline);
router.get("/pemanggilan", getPendaftaranPemanggilan);

router.post("/daftar-ulang/:id_pendaftaran", daftarUlang);

router.get("/dokter", getPendaftaranDokter);

export default router;
