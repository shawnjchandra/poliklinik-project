import express from "express";
import { insertTransaksi, getAllPendaftaranBelumBayar, getTransaksi } from "../controllers/transaksi.js";

const router = express.Router();

router.get("/belum-bayar", getAllPendaftaranBelumBayar);

// router.post("/:id_pendaftaran/", checkTodayTransaksi);

router.get("/:id_pendaftaran/", getTransaksi);

router.post("/bayar/:id_pendaftaran/", insertTransaksi);

export default router;
