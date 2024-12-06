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
  NIP,
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
    NIP,
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
  NIP,
  role,
}) => {
  const hashedPassword = await hashPassword(password);

  const result = await pegawaiRepo.insertPegawai({
    nama,
    no_telp,
    email,
    password: hashedPassword,
    id_kelurahan,
    NIP,
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
    { id_pegawai: pegawai.id_pegawai, role: "pegawai" },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  return token;
};
