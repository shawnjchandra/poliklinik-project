import { BadRequestError } from "../errors/BadRequestError.js";
import { getPasien, insertPasien } from "../repository/pasien.js";
import * as pasienService from "../services/pasien.js";

export const registerPasien = async (req, res) => {
  await pasienService.registerPasien(req.body);

  return res.json({ success: true });
};

export const loginPasien = async (req, res) => {
  const { email, password } = req.body;

  const requiredField = { email, password };

  for (let field in requiredField) {
    console.log(req.body[field] + field);
    if (!req.body[field]) {
      throw new BadRequestError(`${field} must be included`);
    }
  }

  const queryResult = await getPasien(req.body);

  return res.json(queryResult);

  // console.log()
};
