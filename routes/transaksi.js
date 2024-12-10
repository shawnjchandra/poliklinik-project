import express from "express"
import {checkTodayTransaksi, getAllTransaksi, getTransaksi, updateActiveTransaksi} from "../controllers/transaksi.js";

const router = express.Router();

router.get("/", getAllTransaksi);

router.post("/:id_pendaftaran/", checkTodayTransaksi);

router.get("/:id_pendaftaran/", getTransaksi);


router.post("/:id_pendaftaran/confirm", updateActiveTransaksi);

export default router;