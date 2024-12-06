import express from "express";
import { getAllRuang } from "../controllers/ruang.js";

const router = express.Router();

router.get("/", getAllRuang);

export default router;
