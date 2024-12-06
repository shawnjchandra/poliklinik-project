import * as kecamatanService from "../services/kecamatan.js";

export const getAllKecamatan = async (req, res) => {
  const result = await kecamatanService.getAllKecamatan();

  return res.json(result);
};
export const getKecamatanById = async (req, res) => {
  const id_kecamatan = req.params.id_kecamatan;
  const result = await kecamatanService.getKecamatanById(id_kecamatan);

  return res.json(result);
};
