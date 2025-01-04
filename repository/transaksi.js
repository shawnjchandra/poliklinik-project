import pool from "../db/db.js";

export const getAllPendaftaranBelumBayar = async () => {
  const queryText =
    "SELECT p.id_pasien, p.antrian, pas.nama as nama_pasien, p.id_pendaftaran, pas.no_rkm_medis, peg.nama as nama_dokter, r.no_ruang, jpd.start_time, jpd.end_time, rm.id_rkm_med, t.id_transaksi, peg.biaya_kunjungan FROM Pendaftaran p INNER JOIN JadwalPraktikDokter jpd ON p.id_jadwal = jpd.id_jadwal INNER JOIN Pasien pas ON p.id_pasien = pas.id_pasien INNER JOIN Pegawai peg ON jpd.id_pegawai = peg.id_pegawai INNER JOIN Ruang r ON jpd.id_ruang = r.id_ruang LEFT JOIN RekamMedis rm ON rm.id_pendaftaran = p.id_pendaftaran LEFT JOIN Transaksi t ON p.id_pendaftaran = t.id_pendaftaran WHERE p.status = 'tuntas' AND p.tanggal_daftar = CURRENT_DATE AND t.id_transaksi IS NULL ORDER BY p.antrian ASC";

  const queryResult = await pool.query(queryText);

  // console.log(queryResult);

  return queryResult.rows;
};

export const getPendaftaranTuntas = async ({ id_pendaftaran }) => {
  const queryText = "SELECT * FROM Pendaftaran WHERE status = 'tuntas' AND tanggal_daftar = CURRENT_DATE AND id_pendaftaran = $1";

  const values = [id_pendaftaran];

  const queryResult = await pool.query(queryText, values);

  return queryResult.rows;
};

export const insertTransaksi = async ({ id_pendaftaran, biaya_total, metode }) => {
  const queryText = "INSERT INTO Transaksi (metode, biaya_total, id_pendaftaran) VALUES ($1, $2, $3) ";

  const values = [metode, biaya_total, id_pendaftaran];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getTransaksi = async ({ id_pendaftaran }) => {
  const queryText = "SELECT * FROM Transaksi tr JOIN Pendaftaran p ON tr.id_pendaftaran = p.id_pendaftaran WHERE tr.id_pendaftaran = $1 AND p.tanggal_daftar = CURRENT_DATE";

  const values = [id_pendaftaran];

  const queryResult = await pool.query(queryText, values);
  console.log(queryResult);

  return queryResult.rows[0];
};

export const getBiayaTotal = async ({ id_pegawai }) => {
  // const id_pegawai = await getIdDokter({id_pendaftaran});

  let queryText = "SELECT p.biaya_kunjungan FROM JadwalPraktikDokter jpd JOIN Pegawai p ON jpd.id_pegawai = p.id_pegawai WHERE jpd.id_pegawai = $1";

  const values = [id_pegawai];

  const queryResult = await pool.query(queryText, values);

  return queryResult.rows[0].biaya_kunjungan;
};

export const getIdDokter = async ({ id_pendaftaran }) => {
  const queryText = "SELECT id_pegawai FROM Pendaftaran p JOIN JadwalPraktikDokter jpd ON p.id_jadwal = jpd.id_jadwal AND p.id_pendaftaran = $1";

  const values = [id_pendaftaran];

  const queryResult = await pool.query(queryText, values);

  // console.log(queryResult.rows[0].id_pegawai);

  return queryResult.rows[0].id_pegawai;
};
