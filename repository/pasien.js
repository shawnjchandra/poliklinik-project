import { query } from "express";
import pool from "../db/db.js";

export const insertPasien = async ({ nama, no_telp, email, jenis_kelamin, tanggal_lahir, id_kelurahan, password }) => {
  const queryText = "INSERT INTO Pasien (nama, no_telp, email, jenis_kelamin, tanggal_lahir, id_kelurahan, password) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  const values = [nama, no_telp, email, jenis_kelamin, tanggal_lahir, id_kelurahan, password];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getPasienByEmail = async (email) => {
  const queryText = "SELECT * FROM Pasien WHERE email=$1";
  const values = [email];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getPasienById = async (id_pasien) => {
  const queryText = "SELECT * FROM Pasien WHERE id_pasien=$1";
  const values = [id_pasien];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getPassword = async ({ password }) => {
  const queryText = "SELECT * FROM Pasien WHERE password LIKE $1";
  const values = [password];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getAllPasien = async () => {
  // change ltr, do not use *
  const queryText = `SELECT * FROM Pasien`;

  const queryResult = await pool.query(queryText);

  return queryResult;
};
