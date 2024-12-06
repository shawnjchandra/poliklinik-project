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
