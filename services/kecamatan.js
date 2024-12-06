import * as KecamatanRepo from "../repository/kecamatan.js";

export const getAllKecamatan = async () => {
  const queryResult = await KecamatanRepo.getAllKecamatan();

  return queryResult.rows;
};

export const getKecamatanById = async (id_kecamatan) => {
  const queryResult = await KecamatanRepo.getKecamatanById(id_kecamatan);

  if (queryResult.rowCount === 0) {
    throw new NotFoundError("There's no kecamatan with id " + id_kecamatan);
  }

  return queryResult.rows[0];
};
