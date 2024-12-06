import pool from "../db/db.js";

export const getAllKecamatan = async () => {
  const queryText = "SELECT * FROM Kecamatan";
  const queryResult = await pool.query(queryText);

  return queryResult;
};

export const getKecamatanById = async (id_kecamatan) => {
  const queryText = "SELECT * FROM Kecamatan WHERE id_kecamatan = $1";
  const values = [id_kecamatan];
  const queryResult = await pool.query(queryText, values);

  return queryResult;
};
