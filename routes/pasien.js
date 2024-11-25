import express from "express";
import { registerPasien } from "../controllers/pasien.js";

const router = express.Router();

router.get("/register", registerPasien);

export default router;
