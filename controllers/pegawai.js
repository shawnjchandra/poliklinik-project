import * as pegawaiService from "../services/pegawai.js";

export const registerPegawai = async (req, res) => {
  // console.log(req.body);
  await pegawaiService.registerPegawai(req.body);

  return res.json({ success: true });
};
export const registerDokter = async (req, res) => {
  await pegawaiService.registerDokter(req.body);

  return res.json({ success: true });
};

export const loginPegawai = async (req, res) => {
  const token = await pegawaiService.loginPegawai(req.body);

  return res.json({ success: true, token });
};

export const getAllDokter = async (req, res) => {
  const result = await pegawaiService.getAllDokter();

  return res.json(result);
};

export const getDokterById = async (req, res) => {
  const id_pegawai = req.params.id_pegawai;

  const result = await pegawaiService.getDokterById(id_pegawai);

  return res.json(result);
};
