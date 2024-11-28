import { BadRequestError } from "../../errors/BadRequestError.js";
import { isValidDate } from "../../utils/dateValidator.js";
import { isValidEmail } from "../../utils/emailValidator.js";
import { isPassFormatCorrect, isPasswordInjection } from "../../utils/passwordValidator.js";

export const validateRegister = async (req, res, next) => {
  const { nama, no_telp, email, jenis_kelamin, tanggal_lahir, id_kelurahan, password } = req.body;

  const requiredField = { nama, no_telp, email, jenis_kelamin, tanggal_lahir, id_kelurahan, password };
  for (const field in requiredField) {
    if (!requiredField[field]) {
      throw new BadRequestError(`field ${field} must be included`);
    }
  }

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


export const validateLogin = async (req,res,next) =>{
  const { email, password} = req.body;

  const requiredField = { email, password };

  for (let field in requiredField) {
    console.log(req.body[field] + field);
    if (!req.body[field]) {
      throw new BadRequestError(`${field} must be included`);
    }
  }

  if(!isPassFormatCorrect(password)){
    throw new BadRequestError('Password format doesn`t seem to be correct');
  }
  
  if(!isPasswordInjection(password)){
    throw new BadRequestError('Forbidden characters included');

  }

  next();



}