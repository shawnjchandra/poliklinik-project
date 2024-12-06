import pool from "../db/db.js";

export const getAllRuang = async () => {
  const queryText = "SELECT * FROM Ruang";
  const queryResult = await pool.query(queryText);

  return queryResult;
};
