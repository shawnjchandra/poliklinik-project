import express from "express";
import { registerPasien } from "../controllers/pasien.js";

const router = express.Router();

router.post("/register", registerPasien);

export default router;
