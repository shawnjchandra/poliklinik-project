import { BadRequestError } from "../errors/BadRequestError.js";
import { getPasien, insertPasien } from "../repository/pasien.js";
import * as pasienService from "../services/pasien.js";

export const registerPasien = async (req, res) => {
  await pasienService.registerPasien(req.body);

  return res.json({ success: true });
};

export const loginPasien = async (req, res) => {
  const queryResult = await getPasien(req.body);

  return res.json(queryResult);
};
