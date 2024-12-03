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

// Cookie parse
app.use(cookieParser());

// Parse json
app.use(express.json());

//Setting up cors
app.use(cors());

// Routes
app.use("/api/pasien", pasienRoute);

// app.get("/test", authMiddleware);
import { authMiddleware } from "./middleware/authMiddleware.js";
app.get("/test", authMiddleware("pasien"), async (req, res) => {
  return res.json("lol");
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
