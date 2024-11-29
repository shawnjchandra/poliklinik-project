import bcrypt from "bcryptjs";

const saltRounds = 10;

export const hashPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, saltRounds);

  return hashedPass;
};
