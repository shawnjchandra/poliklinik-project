import pool from "../db/db.js";

export const insertPegawai = async ({ nama, no_telp, email, password, id_kelurahan, NIP, role, biaya_kunjungan, id_spesialisasi }) => {
  const insertPegawaiQuery = "INSERT INTO Pegawai (nama, no_telp, email, password, id_kelurahan, NIP, role, biaya_kunjungan, id_spesialisasi) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

  const values = [nama, no_telp, email, password, id_kelurahan, NIP, role, biaya_kunjungan, id_spesialisasi];

  const queryResult = await pool.query(insertPegawaiQuery, values);

  return queryResult;
};

export const getPegawaiByEmail = async (email) => {
  const queryText = "SELECT * FROM Pegawai WHERE email=$1";
  const values = [email];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getPegawaiById = async (id_pegawai) => {
  const queryText = "SELECT * FROM Pegawai WHERE id_pegawai=$1";
  const values = [id_pegawai];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};
