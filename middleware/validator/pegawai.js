import { BadRequestError } from "../../errors/BadRequestError.js";
import { isValidEmail } from "../../utils/emailValidator.js";
import { isPassFormatCorrect } from "../../utils/passwordValidator.js";

const validateFields = (req, requiredFields) => {
  for (const field of requiredFields) {
    if (!req.body[field]) {
      throw new BadRequestError(`Field ${field} must be included`);
    }
  }
};

export const validateRegisterPegawai = async (req, res, next) => {
  const requiredFields = [
    "nama",
    "no_telp",
    "email",
    "password",
    "id_kelurahan",
    "role",
  ];

  validateFields(req, requiredFields);

  const { email, role, password } = req.body;

  if (!["sis-admin", "pet-admin", "perawat", "dokter"].includes(role)) {
    throw new BadRequestError("Role isn't available");
  }

  if (!isPassFormatCorrect(password)) {
    throw new BadRequestError("Password format doesn`t seem to be correct");
  }

  if (!isValidEmail(email)) {
    throw new BadRequestError("invalid email format");
  }

  next();
};

export const validateRegisterDokter = async (req, res, next) => {
  const requiredField = [
    "nama",
    "no_telp",
    "email",
    "password",
    "id_kelurahan",
    "biaya_kunjungan",
    "id_spesialisasi",
  ];

  validateFields(req, requiredField);

  const { email, password, role } = req.body;

  if (role !== "dokter") {
    throw new BadRequestError("role isn't available");
  }

  if (!isPassFormatCorrect(password)) {
    throw new BadRequestError("Password format doesn`t seem to be correct");
  }

  if (!isValidEmail(email)) {
    throw new BadRequestError("invalid email format");
  }

  next();
};

export const validateLogin = async (req, res, next) => {
  const requiredField = ["email", "password"];

  validateFields(req, requiredField);

  const { email } = req.body;

  if (!isValidEmail(email)) {
    throw new BadRequestError("invalid email format");
  }

  next();
};
