import { BadRequestError } from "../errors/BadRequestError.js";
import * as pasienService from "../services/pasien.js";

export const registerPasien = async (req, res) => {

  await pasienService.registerPasien(req.body);

  return res.json({ success: true });
};

export const loginPasien = async (req, res) => {
  const token = await pasienService.loginPasien(req.body);


  return res.json({ success: true, token });

};

export const getAllPasien = async (req, res) => {
  const pasien = await pasienService.getAllPasien();

  return res.json(pasien);

};
