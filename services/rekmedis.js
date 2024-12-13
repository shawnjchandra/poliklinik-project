import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import * as rekMedRepo from "../repository/rekmedis.js";
import * as dokumenRekamMedisRepo from "../repository/dokumenRekamMedis.js";
import pool from "../db/db.js";

// Perawat selalu rekam medis yang baru , dan hanya edit informasi dasar pasien yang itu saja

// Dokter bisa lihat semua rekam medis yang pernah ada, tapi hanya bisa tambah diagnosa pasien untuk yang saat itu saja
export const createRekamMedis = async ({ id_pasien, id_pendaftaran }) => {
  const queryResult = await rekMedRepo.createRekamMedis({ id_pasien, id_pendaftaran });

  //   const queryResultRekamMedis = await rekMedRepo.getLatestRekamMedisByIdPasien(id_pasien);

  return queryResult.rows[0];
};

export const updateInformasiDasar = async ({ tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi, id_rkm_med, dokumen_rekam_medis }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    if (dokumen_rekam_medis.length !== 0) {
      await dokumenRekamMedisRepo.insertDokumenRekamMedis({ id_rkm_med, dokumen_rekam_medis });
    }

    const queryResult = await rekMedRepo.updateInformasiDasar({ tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi, id_rkm_med }, client);

    if (queryResult.rowCount === 0) {
      throw new NotFoundError(`id_rkm_med ${id_rkm_med} is not found`);
    }
    return queryResult.rows[0];

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};

export const updateDiagnosaPasien = async ({ resep_obat, prognosis_tindakan_lanjut, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan, id_rkm_med }) => {
  //   const available = await checkAvailabilityRKM(id_rkm_med);

  //   if (!available) {
  //     throw new BadRequestError("There is no 'rekam medis' available for this user ");
  //   }

  //   const queryResultRekamMedis = await rekMedRepo.getLatestRekamMedisByIdPasien(id_pasien);

  //   const id = queryResultRekamMedis?.id_rkm_med || null;

  //   if (id === null) {
  //     throw new BadRequestError("There are no rows found");
  //   }

  const queryResult = await rekMedRepo.updateDiagnosaPasien({ resep_obat, prognosis_tindakan_lanjut, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan, id_rkm_med });

  if (queryResult.rowCount === 0) {
    throw new NotFoundError(`id_rkm_med ${id_rkm_med} is not found`);
  }

  return queryResult.rows[0];
};

export const getInformasiDasarRekamMedis = async ({ id_rkm_med }) => {
  const queryResult = await rekMedRepo.getInformasiDasarRekamMedis({ id_rkm_med });

  console.log(queryResult.rowCount);

  if (queryResult.rowCount === 0) {
    throw new NotFoundError(`id_rkm_med ${id_rkm_med} is not found`);
  }

  return queryResult.rows[0];
};

export const getDiagnosisRekamMedis = async ({ id_rkm_med }) => {
  const queryResult = await rekMedRepo.getDiagnosisRekamMedis({ id_rkm_med });

  console.log(queryResult.rowCount);

  if (queryResult.rowCount === 0) {
    throw new NotFoundError(`id_rkm_med ${id_rkm_med} is not found`);
  }

  return queryResult.rows[0];
};

const checkAvailabilityRKM = async (id_pasien) => {
  console.log("check availability : " + id_pasien);

  const rekamMedisQueryResult = await rekMedRepo.getRekamMedisByIdPasien(id_pasien);

  console.log("rowCount : " + rekamMedisQueryResult.rowCount);

  return rekamMedisQueryResult.rowCount > 0 ? true : false;
};

export const getRekamMedisPasien = async ({ id_pasien }) => {
  const queryResult = await rekMedRepo.getRekamMedisByIdPasien({ id_pasien });

  return queryResult.rows;
};
