import express from "express";
import { addPendaftaranOnline, addPendaftaranOffline, daftarUlang, getPendaftaran, updateStatus, getRiwayatPendaftaranPasien } from "../controllers/pendaftaran.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// daftar online
router.post("/online", authMiddleware(["pasien"]), addPendaftaranOnline);

// daftar offline, diisin pet-admin
router.post("/offline",/* authMiddleware(["pet-admin"]),*/ addPendaftaranOffline);

router.get("/", authMiddleware(["dokter", "pet-admin", "perawat"]), getPendaftaran);

router.get("/:id_pasien", authMiddleware(["pasien"]), getRiwayatPendaftaranPasien);
// router.get("/pemanggilan", getPendaftaranPemanggilan);

router.post("/daftar-ulang/:id_pendaftaran", authMiddleware(["pet-admin"]), daftarUlang);

// router.get("/dokter", getPendaftaranDokter);

// update status
router.post("/status/:id_pendaftaran", authMiddleware(["dokter", "perawat"]), updateStatus);

export default router;
