import * as jadwalPraktikService from "../services/jadwalPraktik.js";

export const createJadwalPraktik = async (req, res) => {
  const jadwalPraktik = await jadwalPraktikService.createJadwalPraktik(req.body);
  return res.json(jadwalPraktik);
};

export const updateJadwalPraktik = async (req, res) => {
  return res.json("update");
};
