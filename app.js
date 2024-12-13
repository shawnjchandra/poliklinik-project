// Express
import express from "express";
const app = express();

// import multer from "multer";
// const upload = multer();
// app.use(upload.array("product-images"));

// Express async errors
import "express-async-errors";

//axios
import axios from "axios";

// Error handler
import { errorHandler } from "./middleware/errorHandler.js";

//Path
import path from "path";

// dotenv
import dotenv from "dotenv";
dotenv.config();

// Cors
import cors from "cors";

// Model import (Use .js file extension!!!)
import cookieParser from "cookie-parser";

// Routes import
import pasienRoute from "./routes/pasien.js";
import jadwalPraktikRoute from "./routes/jadwalPraktik.js";
import spesialisasiRoute from "./routes/spesialisasi.js";
import pegawaiRoute from "./routes/pegawai.js";
import ruangRoute from "./routes/ruang.js";
import kelurahanRoute from "./routes/kelurahan.js";
import kecamatanRoute from "./routes/kecamatan.js";

import pendaftaranRoute from "./routes/pendaftaran.js";

import rekMedisRoute from "./routes/rekmedis.js";

import transaksiRoute from "./routes/transaksi.js";
// Cookie parse
app.use(cookieParser());

// Parse json
app.use(express.json());

//Setting up cors
app.use(cors());

// Morgan
import morgan from "morgan";
import { authMiddleware } from "./middleware/authMiddleware.js";
app.use(morgan("dev"));

// __dirname
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//express static, klo terpaksa ga jalan
// app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/pasien", pasienRoute);
app.use("/api/jadwal-praktik", jadwalPraktikRoute);
app.use("/api/spesialisasi", spesialisasiRoute);
app.use("/api/pegawai", pegawaiRoute);
app.use("/api/ruang", ruangRoute);
app.use("/api/kelurahan", kelurahanRoute);
app.use("/api/kecamatan", kecamatanRoute);

// app.get("/test", authMiddleware);

app.use("/api/pendaftaran", pendaftaranRoute);

app.use("/api/rekam-medis", rekMedisRoute);

app.use("/api/transaksi", transaksiRoute);

// file upload
// TODO : Extract to route later
app.get("/uploads/:filename", authMiddleware(["perawat", "dokter"]), (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

//Error handling
app.use(errorHandler);

// Run the server
const PORT = 5000;
const HOST = "127.0.0.1";
app.listen(PORT, HOST, () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log("Failed");
  }
});
