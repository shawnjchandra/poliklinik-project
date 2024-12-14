import { NotFoundError } from "../errors/NotFoundError.js";
import * as dokumenRekamMedisRepo from "../repository/dokumenRekamMedis.js";

export const getDokumenRekamMedis = async ({ id_rkm_med }) => {
  const queryResult = await dokumenRekamMedisRepo.getDokumenRekamMedis({ id_rkm_med });

  return queryResult.rows;
};

export const deleteDokumenRekamMedis = async ({ id_dkm }) => {
  const queryResult = await dokumenRekamMedisRepo.deleteDokumenRekamMedis({ id_dkm });

  if (queryResult.rowCount === 0) {
    throw new NotFoundError(`dokumen rekam medis with id ${id_dkm} is not found`);
  }
};
