import express from "express";
import { addPendaftaranOnline, addPendaftaranOffline } from "../controllers/pendaftaran.js";
const router = express.Router();

router.post("/online",addPendaftaranOnline);

router.post("/offline", addPendaftaranOffline);

export default router;