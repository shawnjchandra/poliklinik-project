// STATUS_DAFTAR ('pendaftaran','pemanggilan','dokter', 'pemeriksaan','tuntas');
import pool from "../db/db.js";

/*
    Method : Untuk mendaftarkan pasien
    Param  : Status = 'pendaftaran' atau 'pemanggilan' berdasarkan daftar secara online atau offline (pet)
             tanggal_daftar = tanggal pendaftaran pasien
              * untuk offline dan online, sama" pas daftar ulang di petugas administrasi?
            id_pasien = id dari pasien 
*/
export const addPendaftaran = async ({ status, tanggal_daftar, id_pasien, id_jadwal }) => {
  const queryText = "INSERT INTO Pendaftaran (status, tanggal_daftar, id_pasien, id_jadwal) VALUES ($1, $2, $3, $4)";

  const values = [status, tanggal_daftar, id_pasien, id_jadwal];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

/*
    Method : ubah status dari sebuah pendaftaran 
*/
export const updateStatus = async ({ status, id_pendaftaran, prevStatus }, client) => {
  let queryText = "UPDATE Pendaftaran SET status = $1 WHERE id_pendaftaran = $2 AND tanggal_daftar = CURRENT_DATE";

  const values = [status, id_pendaftaran];
  // prevStatus nandain kondisi prev statusnya harus apa dulu, klo ga diisi, bisa apa aja
  if (prevStatus) {
    queryText += " AND status = $3";
    values.push(prevStatus);
  }

  let queryResult;
  if (client) {
    queryResult = await client.query(queryText, values);
  } else {
    queryResult = await pool.query(queryText, values);
  }

  return queryResult;
};

export const getLatestAntrian = async (client) => {
  const queryText = `SELECT COALESCE(MAX(antrian), 0) AS latest_antrian
      FROM Pendaftaran
      WHERE tanggal_daftar = CURRENT_DATE`;

  let queryResult;
  if (client) {
    queryResult = await client.query(queryText);
  } else {
    queryResult = await pool.query(queryText);
  }

  return queryResult;
};

export const updateAntrian = async ({ id_pendaftaran, antrian }, client) => {
  const queryText = `
    UPDATE Pendaftaran
    SET antrian = $1
    WHERE id_pendaftaran = $2 AND tanggal_daftar = CURRENT_DATE
  `;

  const values = [antrian, id_pendaftaran];

  let queryResult;
  if (client) {
    queryResult = await client.query(queryText, values);
  } else {
    queryResult = await pool.query(queryText, values);
  }

  return queryResult;
};
