import pool from "../db/db.js";

export const getAllKelurahan = async () => {
  const queryText = "SELECT * FROM Kelurahan";

  const queryResult = await pool.query(queryText);

  return queryResult;
};

export const getKelurahanById = async (id_kelurahan) => {
  const queryText = "SELECT * FROM Kelurahan WHERE id_kelurahan = $1";

  const values = [id_kelurahan];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};
