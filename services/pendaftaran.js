import pool from "../db/db.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import * as pendaftaranRepo from "../repository/pendaftaran.js";
import * as rekamMedisRepo from "../repository/rekmedis.js";
import { formatDate } from "../utils/dateFormatter.js";

// tanggal_daftar langsung dari program
export const addPendaftaranOnline = async ({ id_pasien, id_jadwal }) => {
  const tanggal_daftar = Date.now() + 1000 * 60 * 60 * 24;

  const formattedDate = formatDate(tanggal_daftar);

  // Tambah id_jadwal
  const result = await pendaftaranRepo.addPendaftaran({ status: "pendaftaran", tanggal_daftar: formattedDate, id_pasien, id_jadwal });

  return result;
};

// tanggal_daftar langsung dari program + 1 hari
export const addPendaftaranOffline = async ({ id_pasien, id_jadwal }) => {
  const tanggal_daftar = Date.now();

  const formattedDate = formatDate(tanggal_daftar);

  // const idJadwal = await

  // Tambah id_jadwal
  const result = await pendaftaranRepo.addPendaftaran({ status: "pemanggilan", tanggal_daftar: formattedDate, id_pasien, id_jadwal });

  return result;
};

export const updateStatus = async ({ status, id_pendaftaran }) => {
  const result = await pendaftaranRepo.updateStatus({ status, id_pendaftaran });

  return result;
};

export const updateAntrian = async ({ id_pendaftaran }) => {
  const result = await pendaftaranRepo.updateAntrian({ id_pendaftaran });

  return result;
};

export const daftarUlang = async ({ id_pendaftaran }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const queryResultStatus = await pendaftaranRepo.updateStatus({ status: "pemanggilan", id_pendaftaran, prevStatus: "pendaftaran" }, client);

    if (queryResultStatus.rowCount === 0) {
      throw new NotFoundError(`id_pendaftaran ${id_pendaftaran} with status = 'pendaftaran' for today is not found`);
    }

    await client.query("SELECT pg_advisory_lock($1)", [12345]);
    const queryResultLastAntrian = await pendaftaranRepo.getLatestAntrian(client);

    const nextAntrian = queryResultLastAntrian.rows[0].latest_antrian + 1;

    await pendaftaranRepo.updateAntrian({ id_pendaftaran, antrian: nextAntrian }, client);

    await rekamMedisRepo.createRekamMedis({ id_pendaftaran });

    await client.query("SELECT pg_advisory_unlock($1)", [12345]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};

export const getPendaftaranOnline = async () => {
  const queryResult = await pendaftaranRepo.getPendaftaranOnline();

  return queryResult.rows;
};

export const getPendaftaranPemanggilan = async () => {
  const queryResult = await pendaftaranRepo.getPendaftaranPemanggilan();

  return queryResult.rows;
};
