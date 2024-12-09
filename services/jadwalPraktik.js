import { NotFoundError } from "../errors/NotFoundError.js";
import * as jadwalPraktikRepo from "../repository/jadwalPraktik.js";

export const createJadwalPraktik = async ({ hari, start_time, end_time, kuota, id_pegawai, id_ruang }) => {
  
  const queryResult = await jadwalPraktikRepo.insertJadwalPraktik({ hari, start_time, end_time, kuota, id_pegawai, id_ruang });

  const idJadwalPraktik = queryResult.rows[0].id_jadwal;

  return { hari, start_time, end_time, kuota, id_pegawai, id_ruang, id_jadwal: idJadwalPraktik };
};

export const getJadwalPraktik = async (id_pegawai) => {
  const queryResult = await jadwalPraktikRepo.getJadwalPraktik(id_pegawai);

  return queryResult.rows;
};

export const deleteJadwalPraktik = async (id_jadwal) => {
  const queryResult = await jadwalPraktikRepo.deleteJadwalPraktik(id_jadwal);

  if (queryResult.rowCount === 0) {
    throw new NotFoundError(`jadwal praktik with id ${id_jadwal} is not found`);
  }
};
