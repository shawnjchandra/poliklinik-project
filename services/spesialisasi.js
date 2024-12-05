import * as spesialisasiRepo from "../repository/spesialisasi.js";

export const createSpesialisasi = async ({ nama_spesialisasi }) => {
  const result = await spesialisasiRepo.createSpesialisasi(nama_spesialisasi);

  return result;
};
