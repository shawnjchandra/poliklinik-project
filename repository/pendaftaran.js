// STATUS_DAFTAR ('pendaftaran','pemanggilan','dokter', 'pemeriksaan','tuntas');
import pool from "../db/db.js";

export const getRiwayatPendaftaranPasien = async (id_pasien) => {
  const queryText =
    "SELECT p.id_pendaftaran, p.status, p.antrian, p.tanggal_daftar, p.id_pasien, p.id_jadwal, jpd.hari, jpd.start_time, jpd.end_time, jpd.kuota, r.no_ruang, t.id_transaksi, t.metode, peg.nama as nama_dokter, s.nama_spesialisasi, t.biaya_total FROM Pendaftaran p INNER JOIN JadwalPraktikDokter jpd ON p.id_jadwal = jpd.id_jadwal INNER JOIN Ruang r ON jpd.id_ruang = r.id_ruang INNER JOIN Pegawai peg ON jpd.id_pegawai = peg.id_pegawai INNER JOIN Spesialisasi s ON peg.id_spesialisasi = s.id_spesialisasi LEFT JOIN Transaksi t ON p.id_pendaftaran = t.id_pendaftaran WHERE p.id_pasien = $1 ORDER BY p.tanggal_daftar DESC";

  const values = [id_pasien];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getPendaftaranPasienById = async (id_pasien, id_pendaftaran) => {
  const queryText =
    "SELECT p.id_pendaftaran, p.status, p.antrian, p.tanggal_daftar, p.id_pasien, p.id_jadwal, jpd.hari, jpd.start_time, jpd.end_time, jpd.kuota, r.no_ruang, t.id_transaksi, t.metode, peg.nama as nama_dokter, s.nama_spesialisasi, t.biaya_total FROM Pendaftaran p INNER JOIN JadwalPraktikDokter jpd ON p.id_jadwal = jpd.id_jadwal INNER JOIN Ruang r ON jpd.id_ruang = r.id_ruang INNER JOIN Pegawai peg ON jpd.id_pegawai = peg.id_pegawai INNER JOIN Spesialisasi s ON peg.id_spesialisasi = s.id_spesialisasi LEFT JOIN Transaksi t ON p.id_pendaftaran = t.id_pendaftaran WHERE p.id_pasien = $1 AND p.id_pendaftaran = $2 ORDER BY p.tanggal_daftar DESC";

  const values = [id_pasien, id_pendaftaran];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const getPendaftaranOnline = async () => {
  const queryText =
    "SELECT pas.nama as nama_pasien, p.id_pendaftaran, pas.no_rkm_medis, peg.nama as nama_dokter, r.no_ruang, jpd.start_time, jpd.end_time FROM Pendaftaran p INNER JOIN JadwalPraktikDokter jpd ON p.id_jadwal = jpd.id_jadwal INNER JOIN Pasien pas ON p.id_pasien = pas.id_pasien INNER JOIN Pegawai peg ON jpd.id_pegawai = peg.id_pegawai INNER JOIN Ruang r ON jpd.id_ruang = r.id_ruang WHERE p.status = 'pendaftaran' AND p.tanggal_daftar = CURRENT_DATE";

  const queryResult = await pool.query(queryText);

  return queryResult;
};

export const getPendaftaranPemanggilan = async () => {
  const queryText =
    "SELECT p.antrian, pas.nama as nama_pasien, p.id_pendaftaran, pas.no_rkm_medis, peg.nama as nama_dokter, r.no_ruang, jpd.start_time, jpd.end_time, rm.id_rkm_med FROM Pendaftaran p INNER JOIN JadwalPraktikDokter jpd ON p.id_jadwal = jpd.id_jadwal INNER JOIN Pasien pas ON p.id_pasien = pas.id_pasien INNER JOIN Pegawai peg ON jpd.id_pegawai = peg.id_pegawai INNER JOIN Ruang r ON jpd.id_ruang = r.id_ruang INNER JOIN RekamMedis rm ON rm.id_pendaftaran = p.id_pendaftaran WHERE p.status = 'pemanggilan' AND p.tanggal_daftar = CURRENT_DATE ORDER BY p.antrian ASC";

  const queryResult = await pool.query(queryText);

  return queryResult;
};

export const getPendaftaran = async ({ status }) => {
  const queryText =
    "SELECT p.antrian, pas.nama as nama_pasien, p.id_pendaftaran, pas.no_rkm_medis, peg.nama as nama_dokter, r.no_ruang, jpd.start_time, jpd.end_time, rm.id_rkm_med FROM Pendaftaran p INNER JOIN JadwalPraktikDokter jpd ON p.id_jadwal = jpd.id_jadwal INNER JOIN Pasien pas ON p.id_pasien = pas.id_pasien INNER JOIN Pegawai peg ON jpd.id_pegawai = peg.id_pegawai INNER JOIN Ruang r ON jpd.id_ruang = r.id_ruang LEFT JOIN RekamMedis rm ON rm.id_pendaftaran = p.id_pendaftaran WHERE p.status = $1 AND p.tanggal_daftar = CURRENT_DATE ORDER BY p.antrian ASC";

  const values = [status];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

/*
    Method : Untuk mendaftarkan pasien
    Param  : Status = 'pendaftaran' atau 'pemanggilan' berdasarkan daftar secara online atau offline (pet)
             tanggal_daftar = tanggal pendaftaran pasien
              * untuk offline dan online, sama" pas daftar ulang di petugas administrasi?
            id_pasien = id dari pasien 
*/
export const addPendaftaran = async ({
  status,
  tanggal_daftar,
  id_pasien,
  id_jadwal,
}) => {
  const queryText =
    "INSERT INTO Pendaftaran (status, tanggal_daftar, id_pasien, id_jadwal) VALUES ($1, $2, $3, $4) RETURNING id_pendaftaran";

  const values = [status, tanggal_daftar, id_pasien, id_jadwal];

  const queryResult = await pool.query(queryText, values);

  return queryResult.rows[0];
};

/*
    Method : ubah status dari sebuah pendaftaran 
*/

export const updateStatus = async (
  { status, id_pendaftaran, prevStatus },
  client
) => {
  let queryText =
    "UPDATE Pendaftaran SET status = $1 WHERE id_pendaftaran = $2 AND tanggal_daftar = CURRENT_DATE";

  const values = [status, id_pendaftaran];
  // prevStatus nandain kondisi prev statusnya harus apa dulu, klo ga diisi, bisa apa aja
  if (prevStatus) {
    queryText += " AND status = $3";
    values.push(prevStatus);
  }

  let queryResult;
  if (client) {
    queryResult = await client.query(queryText, values);
  } else {
    queryResult = await pool.query(queryText, values);
  }

  return queryResult;
};

export const getLatestAntrian = async (client) => {
  const queryText = `SELECT COALESCE(MAX(antrian), 0) AS latest_antrian
      FROM Pendaftaran
      WHERE tanggal_daftar = CURRENT_DATE`;

  let queryResult;
  if (client) {
    queryResult = await client.query(queryText);
  } else {
    queryResult = await pool.query(queryText);
  }

  return queryResult;
};

export const updateAntrian = async ({ id_pendaftaran, antrian }, client) => {
  const queryText = `
    UPDATE Pendaftaran
    SET antrian = $1
    WHERE id_pendaftaran = $2 AND tanggal_daftar = CURRENT_DATE
  `;

  const values = [antrian, id_pendaftaran];

  let queryResult;
  if (client) {
    queryResult = await client.query(queryText, values);
  } else {
    queryResult = await pool.query(queryText, values);
  }

  return queryResult;
};
