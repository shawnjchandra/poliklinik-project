import { hashPassword } from "../utils/hashPassword.js";
import * as pasienRepo from "../repository/pasien.js";

export const registerPasien = async ({ nama, no_telp, email, jenis_kelamin, tanggal_lahir, id_kelurahan, password }) => {
  const hashedPassword = hashPassword(password);
  const result = await pasienRepo.insertPasien({ nama, no_telp, email, jenis_kelamin, tanggal_lahir, id_kelurahan, hashedPassword });
  return result;
};
