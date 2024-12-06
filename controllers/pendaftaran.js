// import service
import * as pendaftaranService from "../services/pendaftaran.js";

// const addPendaftaran
export const addPendaftaranOnline = async (req, res) => {
  await pendaftaranService.addPendaftaranOnline(req.body);

  return res.json({ success: true });
};

export const addPendaftaranOffline = async (req, res) => {
  await pendaftaranService.addPendaftaranOffline(req.body);

  return res.json({ success: true });
};

export const updateStatus = async (req, res) => {
  await pendaftaranService.updateStatus(req.body);

  return res.json({ success: true });
};

export const updateAntrian = async (req, res) => {
  await pendaftaranService.updateAntrian(req.body);

  return res.json({ success: true });
};

export const daftarUlang = async (req, res) => {
  const { id_pendaftaran } = req.params;
  await pendaftaranService.daftarUlang({ id_pendaftaran });

  return res.json({ success: true });
};
