import express from "express";
import { getAllKelurahan, getKelurahanById } from "../controllers/kelurahan.js";

const router = express.Router();

router.get("/", getAllKelurahan);

router.get("/:id_kelurahan", getKelurahanById);

export default router;
