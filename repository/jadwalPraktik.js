import { query } from "express";
import pool from "../db/db.js";

export const insertJadwalPraktik = async ({ hari, start_time, end_time, kuota, id_pegawai, id_ruang }) => {
  const queryText = "INSERT INTO JadwalPraktikDokter (hari, start_time, end_time, kuota, id_pegawai, id_ruang) VALUES($1, $2, $3, $4, $5, $6) RETURNING id_jadwal";
  const values = [hari, start_time, end_time, kuota, id_pegawai, id_ruang];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};
