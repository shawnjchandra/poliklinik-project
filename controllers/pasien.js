import { BadRequestError } from "../errors/BadRequestError.js";
import { getPasien, insertPasien } from "../repository/pasien.js";
import bcrypt from "bcryptjs";

import { hashPassword } from "../utils/encryptPassword.js";

export const registerPasien = async (req, res) => {
  let {password} = req.body;
  password = await hashPassword(password);

  // console.log({...req.body});
  // console.log("password "+password);
  const queryResult = await insertPasien({ ...req.body, password });

  return res.json(queryResult);
};

export const loginPasien = async (req, res, next) => {
  const { email, password } = req.body;

  const requiredField = { email, password };

  for (let field in requiredField) {
    console.log(req.body[field] + field);
    if (!req.body[field]) {
      throw new BadRequestError(`${field} must be included`);
    }
  }

  const queryResult = await getPasien(req.body);

  if (queryResult.rowCount === 0) {
    throw new BadRequestError("Email is not registered");
  }

  const user = queryResult.rows[0];
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new BadRequestError("Incorrect password");
  }

  const {header,payload} = messageToSign(user);

  req.data =({header,payload});
  
  next();
  // return res.json(queryResult);


  // console.log()
};


function messageToSign(user){
  const header = {
    "alg": "RS256",
    "typ": "Token"
  }

  //Perlu testing di pegawai
  const payload = {
    "nama" : user.nama,
    "exp" : Date.now() + (15*60*1000),
    "role" : user.role === null ? "pasien" : user.role
  }

  return {header, payload};
}