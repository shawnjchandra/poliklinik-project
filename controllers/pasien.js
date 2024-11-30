import { BadRequestError } from "../errors/BadRequestError.js";
import { getPasien, insertPasien } from "../repository/pasien.js";

import { hashPassword } from "../utils/encryptPassword.js";

export const registerPasien = async (req, res) => {
  const queryResult = await insertPasien({ ...req.body, password: hashPassword(req.body.password) });

  return res.json(queryResult);
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
