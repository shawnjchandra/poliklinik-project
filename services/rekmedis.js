import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import * as rekMedRepo from "../repository/rekmedis.js";

// Perawat selalu rekam medis yang baru , dan hanya edit informasi dasar pasien yang itu saja

// Dokter bisa lihat semua rekam medis yang pernah ada, tapi hanya bisa tambah diagnosa pasien untuk yang saat itu saja
export const createRekamMedis = async ({ id_pasien, id_pendaftaran }) => {
  const queryResult = await rekMedRepo.createRekamMedis({ id_pasien, id_pendaftaran });

  //   const queryResultRekamMedis = await rekMedRepo.getLatestRekamMedisByIdPasien(id_pasien);

  return queryResult.rows[0];
};

export const updateInformasiDasar = async ({ tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi, id_rkm_med }) => {
  //   const available = await checkAvailabilityRKM(id_pasien);

  //   if (!available) {
  //     throw new BadRequestError("There is no 'rekam medis' available for this user ");
  //   }

  //   const queryResultRekamMedis = await rekMedRepo.getLatestRekamMedisByIdPasien(id_pasien);

  //   const id = queryResultRekamMedis?.id_rkm_med || null;

  //   if (id === null) {
  //     throw new BadRequestError("There are no rows found");
  //   }

  const queryResult = await rekMedRepo.updateInformasiDasar({ tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi, id_rkm_med });

  if (queryResult.rowCount === 0) {
    throw new NotFoundError(`id_rkm_med ${id_rkm_med} is not found`);
  }
  return queryResult.rows[0];
};

export const updateDiagnosaPasien = async ({ resep_obat, prognosis, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan, id_pasien }) => {
  const available = await checkAvailabilityRKM(id_pasien);

  if (!available) {
    throw new BadRequestError("There is no 'rekam medis' available for this user ");
  }

  const queryResultRekamMedis = await rekMedRepo.getLatestRekamMedisByIdPasien(id_pasien);

  const id = queryResultRekamMedis?.id_rkm_med || null;

  if (id === null) {
    throw new BadRequestError("There are no rows found");
  }

  await rekMedRepo.updateDiagnosaPasien({ resep_obat, prognosis, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan, id_rkm_med: id });

  return { success: true };
};

export const getRekamMedis = async ({ id_rkm_med }) => {
  const queryResult = await rekMedRepo.getRekamMedisByIdRM(id_rkm_med);
};

const checkAvailabilityRKM = async (id_pasien) => {
  console.log("check availability : " + id_pasien);

  const rekamMedisQueryResult = await rekMedRepo.getRekamMedisByIdPasien(id_pasien);

  console.log("rowCount : " + rekamMedisQueryResult.rowCount);

  return rekamMedisQueryResult.rowCount > 0 ? true : false;
};
