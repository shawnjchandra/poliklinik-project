import * as dokumenRekamMedisRepo from "../repository/dokumenRekamMedis.js";

export const getDokumenRekamMedis = async ({ id_rkm_med }) => {
  const queryResult = await dokumenRekamMedisRepo.getDokumenRekamMedis({ id_rkm_med });

  return queryResult.rows;
};

export const deleteDokumenRekamMedis = async ({ id_dkm }) => {
  await dokumenRekamMedisRepo.deleteDokumenRekamMedis({ id_dkm });
};
