import pool from "../db/db.js";

export const createRekamMedis = async ({ id_pendaftaran }) => {
  const queryText = "INSERT INTO RekamMedis (id_pendaftaran) VALUES ($1) RETURNING *";

  const values = [id_pendaftaran];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const updateInformasiDasar = async ({ tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi, id_rkm_med }) => {
  console.log("di repo : " + id_rkm_med);

  const queryText = "UPDATE RekamMedis SET tinggi_badan = $1, berat_badan = $2, golongan_darah = $3, diastolik= $4, sistolik = $5, denyut_nadi = $6 WHERE id_rkm_med = $7 RETURNING *";

  const values = [tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi, id_rkm_med];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const updateDiagnosaPasien = async ({ resep_obat, prognosis, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan, id_rkm_med }) => {
  const queryText = "UPDATE RekamMedis SET resep_obat = $1, prognosis_tindakan_lanjut = $2, diag_penunjang =$3, pemeriksaan_fisik = $4, pemeriksaan_penunjang = $5, riwayat_penyakit = $6, keluhan = $7 WHERE id_rkm_med = $8 RETURNING *";

  const values = [resep_obat, prognosis, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan, id_rkm_med];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getRekamMedisByIdPasien = async (id_pasien) => {
  const queryText = "SELECT * FROM RekamMedis WHERE id_pasien = $1";

  const values = [id_pasien];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getLatestRekamMedisByIdPasien = async (id_pasien) => {
  const queryText = "SELECT * FROM RekamMedis WHERE id_pasien = $1 ORDER BY id_rkm_med DESC";
  console.log("di latest " + id_pasien);

  const values = [id_pasien];

  const queryResult = await pool.query(queryText, values);

  // console.log("di latest isi row "+queryResult.rows[0].id_rkm_med);
  return queryResult.rows[0] || null;
};

export const getInformasiDasarRekamMedis = async ({ id_rkm_med }) => {
  // dont use * change later !!!
  const queryText =
    "SELECT rm.tinggi_badan, rm.id_rkm_med, rm.berat_badan, rm.diastolik, rm.sistolik, rm.golongan_darah, rm.denyut_nadi FROM RekamMedis rm INNER JOIN Pendaftaran p ON rm.id_pendaftaran = p.id_pendaftaran INNER JOIN Pasien pas ON pas.id_pasien = p.id_pasien INNER JOIN JadwalPraktikDokter jpd ON jpd.id_jadwal = p.id_jadwal INNER JOIN Pegawai peg ON jpd.id_pegawai = peg.id_pegawai WHERE id_rkm_med = $1";

  const values = [id_rkm_med];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getDiagnosisRekamMedis = async ({ id_rkm_med }) => {
  const queryText =
    "SELECT rm.resep_obat, rm.id_rkm_med, rm.prognosis_tindakan_lanjut, rm.diag_penunjang, rm.pemeriksaan_fisik, rm.pemeriksaan_penunjang, rm.keluhan, FROM RekamMedis rm INNER JOIN Pendaftaran p ON rm.id_pendaftaran = p.id_pendaftaran INNER JOIN Pasien pas ON pas.id_pasien = p.id_pasien INNER JOIN JadwalPraktikDokter jpd ON jpd.id_jadwal = p.id_jadwal INNER JOIN Pegawai peg ON jpd.id_pegawai = peg.id_pegawai WHERE id_rkm_med = $1";

  const values = [id_rkm_med];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

// CREATE TABLE RekamMedis(
//     id_rkm_med INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//     resep_obat VARCHAR(255),
//     prognosis_tindakan_lanjut VARCHAR(255),
//     diag_penunjang VARCHAR(255),
//     pemeriksaan_fisik VARCHAR(255),
//     pemeriksaan_penunjang VARCHAR(255),
//     riwayat_penyakit VARCHAR(255),
//     keluhan VARCHAR(255),
//     tinggi_badan REAL,
//     berat_badan REAL,
//     golongan_darah GOL_DARAH,
//     diastolik INT,
//     sistolik INT,
//     denyut_nadi INT,
//     id_pasien INT REFERENCES Pasien(id_pasien)
// );
