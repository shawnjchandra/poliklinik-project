import express from "express";
import { validateSpesialisasi } from "../middleware/validator/spesialisasi.js";
import { createSpesialisasi } from "../controllers/spesialisasi.js";

const router = express.Router();

router.post("/", validateSpesialisasi, createSpesialisasi);

export default router;
