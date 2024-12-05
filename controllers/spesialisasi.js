import * as spesialisasiService from "../services/spesialisasi.js";

export const createSpesialisasi = async (req, res) => {
  const result = await spesialisasiService.createSpesialisasi(req.body);

  return res.json(result);
};
