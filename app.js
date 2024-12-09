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
// Cookie parse
app.use(cookieParser());

// Parse json
app.use(express.json());

//Setting up cors
app.use(cors());

// Morgan
import morgan from "morgan";
app.use(morgan("dev"));

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

app.get("/test", async (req, res) => {
  // return res.json({ success: true });

  const a = await axios.get("http://192.168.77.50:8080/api/test");
  return res.json(a.data);
  try {
    const a = await pool.query("SELECT 5+5;");
    console.log(a);
    return res.json(a.rows);
  } catch (err) {
    throw new InternalServerError("error");
  }
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
