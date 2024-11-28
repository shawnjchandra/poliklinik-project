import { isValidDate } from "../../utils/dateValidator.js";
import { isValidEmail } from "../../utils/emailValidator.js";

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

  if (!isValidDate(tanggal_lahir)) {
    throw new BadRequestError("tanggal_lahir format must be YYYY-MM-DD");
  }

  if (!isValidEmail(email)) {
    throw new BadRequestError("invalid email format");
  }

  next();
};