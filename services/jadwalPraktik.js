import * as jadwalPraktikRepo from "../repository/jadwalPraktik.js";

export const createJadwalPraktik = async ({ hari, start_time, end_time, kuota, id_pegawai, id_ruang }) => {
  const queryResult = await jadwalPraktikRepo.insertJadwalPraktik({ hari, start_time, end_time, kuota, id_pegawai, id_ruang });

  const jadwalPraktikId = queryResult.rows[0].id_jadwal;

  return jadwalPraktikId;
};
