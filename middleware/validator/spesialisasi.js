export const validateSpesialisasi = async (req, res, next) => {
  const requiredField = ["nama_spesialisasi"];

  for (const field of requiredField) {
    if (!req.body[field]) {
      throw new BadRequestError(`${field} must be included`);
    }
  }

  next();
};
