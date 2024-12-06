import * as ruangService from "../services/ruang.js";

export const getAllRuang = async (req, res) => {
  const result = await ruangService.getAllRuang();

  return res.json(result);
};
