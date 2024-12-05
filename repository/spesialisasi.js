import pool from "../db/db.js";

export const createSpesialisasi = async (nama_spesialisasi) => {
  const newSpesialisasiQuery =
    "INSERT INTO Spesialisasi(nama_spesialisasi) VALUES ($1)";
  const values = [nama_spesialisasi];

  const queryResult = await pool.query(newSpesialisasiQuery, values);

  return queryResult;
};

export const getSpesialisasi = async (id_spesialisasi) => {
  let getSpesialisasiQuery = "SELECT * FROM Spesialisasi";
  const values = [];
  if (id_spesialisasi != null) {
    getSpesialisasiQuery += " WHERE id_spesialisasi = $1";
    values.push(id_spesialisasi);
  }

  const queryResult = await pool.query(getSpesialisasiQuery, values);

  return queryResult;
};
