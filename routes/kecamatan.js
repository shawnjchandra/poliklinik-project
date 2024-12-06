import express from "express";
import { getAllKecamatan, getKecamatanById } from "../controllers/kecamatan.js";

const router = express.Router();

router.get("/", getAllKecamatan);
router.get("/:id_kecamatan", getKecamatanById);

export default router;
