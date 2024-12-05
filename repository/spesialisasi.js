import pool from "../db/db.js";

export const createSpesialisasi = async (nama_spesialisasi) => {
  const newSpesialisasiQuery =
    "INSERT INTO Spesialisasi(nama_spesialisasi) VALUES ($1)";
  const values = [nama_spesialisasi];

  const queryResult = await pool.query(newSpesialisasiQuery, values);

  return queryResult;
};
