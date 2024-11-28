import bcrypt from "bcryptjs";

// const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, saltRounds);

  return hashedPass;
};
