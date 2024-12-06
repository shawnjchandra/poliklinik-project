import express, { Router } from "express";
import { addNewDiagnosa } from "../controllers/rekmedis.js";

const router = express.Router();

router.post("/rekmedis", addNewDiagnosa)

export default router;