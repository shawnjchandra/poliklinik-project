import express from "express";
import {
  validateLogin,
  validateRegisterDokter,
  validateRegisterPegawai,
} from "../middleware/validator/pegawai.js";
import {
  getAllDokter,
  getDokterById,
  loginPegawai,
  registerDokter,
  registerPegawai,
} from "../controllers/pegawai.js";

const router = express.Router();

router.post("/register/dokter", validateRegisterDokter, registerDokter);

router.post("/register/pegawai", validateRegisterPegawai, registerPegawai);

router.post("/login", validateLogin, loginPegawai);
router.get("/dokter/", getAllDokter);
router.get("/dokter/:id_pegawai", getDokterById);

export default router;
