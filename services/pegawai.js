import { hashPassword } from "../utils/hashPassword.js";
import * as pegawaiRepo from "../repository/pegawai.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerDokter = async ({
  nama,
  no_telp,
  email,
  password,
  id_kelurahan,
  role,
  biaya_kunjungan,
  id_spesialisasi,
}) => {
  const hashedPassword = await hashPassword(password);

  const result = await pegawaiRepo.insertPegawai({
    nama,
    no_telp,
    email,
    password: hashedPassword,
    id_kelurahan,
    role,
    biaya_kunjungan,
    id_spesialisasi,
  });
  return result;
};

export const registerPegawai = async ({
  nama,
  no_telp,
  email,
  password,
  id_kelurahan,
  role,
}) => {
  const hashedPassword = await hashPassword(password);

  console.log("hello");
  const result = await pegawaiRepo.insertPegawai({
    nama,
    no_telp,
    email,
    password: hashedPassword,
    id_kelurahan,
    role,
  });
  return result;
};

export const loginPegawai = async ({ email, password }) => {
  const pegawaiQueryResult = await pegawaiRepo.getPegawaiByEmail(email);

  if (pegawaiQueryResult.rowCount === 0) {
    throw new NotFoundError("email is not registered");
  }

  const pegawai = pegawaiQueryResult.rows[0];
  const isPasswordMatch = await bcrypt.compare(password, pegawai.password);

  if (!isPasswordMatch) {
    throw new UnauthorizedError("incorrect password");
  }

  const token = jwt.sign(
    { id_pegawai: pegawai.id_pegawai, role: pegawai.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  return token;
};

export const getAllDokter = async () => {
  const queryResult = await pegawaiRepo.getAllDokter();

  return queryResult.rows;
};

export const getDokterById = async (id_pegawai) => {
  const queryResult = await pegawaiRepo.getDokterById(id_pegawai);

  if (queryResult.rowCount === 0) {
    throw new NotFoundError("there's no dokter with id " + id_pegawai);
  }

  return queryResult.rows[0];
};
