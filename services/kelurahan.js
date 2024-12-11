import { NotFoundError } from "../errors/NotFoundError.js";
import * as KelurahanRepo from "../repository/kelurahan.js";

export const getAllKelurahan = async () => {
  const queryResult = await KelurahanRepo.getAllKelurahan();

  return queryResult.rows;
};

export const getKelurahanById = async (id_kelurahan) => {
  const queryResult = await KelurahanRepo.getKelurahanById(id_kelurahan);

  if (queryResult.rowCount === 0) {
    throw new NotFoundError("There's no kelurahan with id " + id_kelurahan);
  }

  return queryResult.rows[0];
};
