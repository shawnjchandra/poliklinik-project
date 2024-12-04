import { BadRequestError } from "../../errors/BadRequestError.js";
import { isValidDate } from "../../utils/dateValidator.js";
import { isValidEmail } from "../../utils/emailValidator.js";
import { isPassFormatCorrect, isPasswordInjection } from "../../utils/passwordValidator.js";

export const validateRegister = async (req, res, next) => {
  const requiredField = ["nama", "no_telp", "email", "jenis_kelamin", "tanggal_lahir", "id_kelurahan", "password"];
  for (const field of requiredField) {
    if (!req.body[field]) {
      throw new BadRequestError(`field ${field} must be included`);
    }
  }

  const { email, jenis_kelamin, tanggal_lahir } = req.body;
  if (jenis_kelamin !== "perempuan" && jenis_kelamin !== "laki") {
    throw new BadRequestError("jenis_kelamin must be either perempuan or laki");
  }

  if(!isPassFormatCorrect(password)){
    throw new BadRequestError('Password format doesn`t seem to be correct');
  }

  if (!isValidDate(tanggal_lahir)) {
    throw new BadRequestError("tanggal_lahir format must be YYYY-MM-DD");
  }

  if (!isValidEmail(email)) {
    throw new BadRequestError("invalid email format");
  }

  next();
};


export const validateLogin = async (req, res, next) => {
  const requiredField = ["email", "password"];
  for (const field of requiredField) {

    if (!req.body[field]) {
      throw new BadRequestError(`${field} must be included`);
    }
  }


  const { email } = req.body;

  if (!isValidEmail(email)) {
    throw new BadRequestError("invalid email format");
  }

  next();
};

