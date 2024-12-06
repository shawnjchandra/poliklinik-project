import * as spesialisasiRepo from "../repository/spesialisasi.js";

export const createSpesialisasi = async ({ nama_spesialisasi }) => {
  const result = await spesialisasiRepo.createSpesialisasi(nama_spesialisasi);

  return result;
};

export const getAllSpesialisasi = async () => {
  const result = await spesialisasiRepo.getSpesialisasi();

  return result;
};

export const getSpesialisasiByID = async (id_spesialisasi) => {
  const result = await spesialisasiRepo.getSpesialisasi(id_spesialisasi);

  return result;
};
