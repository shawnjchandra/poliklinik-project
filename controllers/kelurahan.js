import * as kelurahanService from "../services/kelurahan.js";

export const getAllKelurahan = async (req, res) => {
  const result = await kelurahanService.getAllKelurahan();

  return res.json(result);
};

export const getKelurahanById = async (req, res) => {
  const id_kelurahan = req.params.id_kelurahan;

  const result = await kelurahanService.getKelurahanById(id_kelurahan);

  return res.json(result);
};
