import * as spesialisasiService from "../services/spesialisasi.js";

export const createSpesialisasi = async (req, res) => {
  await spesialisasiService.createSpesialisasi(req.body);

  return res.json({ success: true });
};

export const getAllSpesialisasi = async (req, res) => {
  const result = await spesialisasiService.getAllSpesialisasi();

  return res.json(result.rows);
};

export const getSpesialisasiByID = async (req, res) => {
  const id_spesialisasi = req.params.id_spesialisasi;
  const result = await spesialisasiService.getSpesialisasiByID(id_spesialisasi);

  return res.json(result.rows);
};
