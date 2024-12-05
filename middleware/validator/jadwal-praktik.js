import { BadRequestError } from "../../errors/BadRequestError.js";
import { isValidDate } from "../../utils/dateValidator.js";
import { isValidRange, isValidTime } from "../../utils/timeValidator.js";

export const validateCreateJadwalPraktik = async (req, res, next) => {
  const { hari, start_time, end_time, kuota, id_pegawai, id_ruang } = req.body;

  const requiredField = ["hari", "start_time", "end_time", "kuota", "id_pegawai, id_ruang"];

  for (const field of requiredField) {
    if (!req.body[field]) {
      throw new BadRequestError(`${field} must be included`);
    }
  }

  const validHari = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];
  if (!validHari.includes(hari)) {
    throw new BadRequestError("invalid hari");
  }

  if (!isValidTime(start_time)) {
    throw new BadRequestError("invalid start_time");
  }

  if (!isValidTime(end_time)) {
    throw new BadRequestError("invalid end_time");
  }

  if (!isValidRange(start_time, end_time)) {
    throw new BadRequestError("invalid range");
  }
};
