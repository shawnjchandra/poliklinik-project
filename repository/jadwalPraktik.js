import { query } from "express";
import pool from "../db/db.js";

export const insertJadwalPraktik = async ({ hari, start_time, end_time, kuota, id_pegawai, id_ruang }) => {
  const queryText = "INSERT INTO JadwalPraktikDokter (hari, start_time, end_time, kuota, id_pegawai, id_ruang) VALUES($1, $2, $3, $4, $5, $6) RETURNING id_jadwal";
  const values = [hari, start_time, end_time, kuota, id_pegawai, id_ruang];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getAllJadwalPraktik = async () => {
  const queryText = "SELECT * FROM JadwalPraktikDokter jpd INNER JOIN Ruang r ON jpd.id_ruang = r.id_ruang ";

  const queryResult = await pool.query(queryText);

  return queryResult;
};

export const getJadwalPraktik = async (id_pegawai, day) => {
  const queryText = `SELECT jpd.*, r.*, (jpd.kuota - ( SELECT COUNT(p.id_pendaftaran) FROM Pendaftaran p WHERE p.id_jadwal = jpd.id_jadwal AND p.tanggal_daftar = CURRENT_DATE ${
    day === "tomorrow" ? "+ INTERVAL '1 day'" : ""
  } ))::int AS sisa_kuota FROM JadwalPraktikDokter jpd INNER JOIN Ruang r ON jpd.id_ruang = r.id_ruang WHERE jpd.id_pegawai = $1 AND jpd.is_active = TRUE `;

  const values = [id_pegawai];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const deleteJadwalPraktik = async (id_jadwal) => {
  const queryText = "UPDATE JadwalPraktikDokter SET is_active = FALSE WHERE id_jadwal = $1";
  const values = [id_jadwal];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};
