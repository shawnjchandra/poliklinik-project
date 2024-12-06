import express from "express";
import { validateSpesialisasi } from "../middleware/validator/spesialisasi.js";
import {
  createSpesialisasi,
  getAllSpesialisasi,
  getSpesialisasiByID,
} from "../controllers/spesialisasi.js";

const router = express.Router();

router.post("/", validateSpesialisasi, createSpesialisasi);

router.get("/", getAllSpesialisasi);

router.get("/:id_spesialisasi", getSpesialisasiByID);

export default router;
