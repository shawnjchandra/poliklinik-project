import express from "express";
import { addPendaftaranOnline, addPendaftaranOffline, daftarUlang, getPendaftaranOnline } from "../controllers/pendaftaran.js";
const router = express.Router();

router.post("/online", addPendaftaranOnline);

router.post("/offline", addPendaftaranOffline);

router.get("/online", getPendaftaranOnline);

router.post("/daftar-ulang/:id_pendaftaran", daftarUlang);

export default router;
