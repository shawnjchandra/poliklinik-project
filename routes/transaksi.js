import express from "express"
import {insertTransaksi, getAllPendaftaranTuntas, getTransaksi} from "../controllers/transaksi.js";


const router = express.Router();

router.get("/", getAllPendaftaranTuntas);

// router.post("/:id_pendaftaran/", checkTodayTransaksi);

router.get("/:id_pendaftaran/", getTransaksi);


router.post("/bayar/:id_pendaftaran/", insertTransaksi);

export default router;