import { hashPassword } from "../utils/hashPassword.js";
import * as pasienRepo from "../repository/pasien.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { generateToken } from "../utils/token/token.js";


export const registerPasien = async ({ nama, no_telp, email, jenis_kelamin, tanggal_lahir, id_kelurahan, password }) => {
  const hashedPassword = await hashPassword(password);

  const result = await pasienRepo.insertPasien({ nama, no_telp, email, jenis_kelamin, tanggal_lahir, id_kelurahan, password: hashedPassword });

  const result = await pasienRepo.insertPasien({
    nama,
    no_telp,
    email,
    jenis_kelamin,
    tanggal_lahir,
    id_kelurahan,
    password: hashedPassword,
  });

  return result;
};

export const loginPasien = async ({ email, password }) => {
  const pasienQueryResult = await pasienRepo.getPasienByEmail(email);

  if (pasienQueryResult.rowCount === 0) {
    throw new NotFoundError("email is not registered");
  }

  const pasien = pasienQueryResult.rows[0];

  const isPasswordMatch = await bcrypt.compare(password, pasien.password);

  if (!isPasswordMatch) {
    throw new UnauthorizedError("incorrect password");
  }


  const token = generateToken({ alg: "RS256" }, { id_pengguna: pasien.id_pasien, role: "pasien" });

  return token;
};


export const getAllPasien = async () => {
  const queryResult = await pasienRepo.getAllPasien();

  return queryResult.rows;
};

