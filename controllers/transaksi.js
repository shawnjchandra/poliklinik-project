import * as transaksiService from "../services/transaksi.js";

export const getAllPendaftaranBelumBayar = async (req, res) => {
  const pendaftaranBelumBayar = await transaksiService.getAllPendaftaranBelumBayar();

  // console.log(list);

  return res.json(pendaftaranBelumBayar);
};

export const insertTransaksi = async (req, res) => {
  const { id_pendaftaran } = req.params;

  const { metode } = req.body;

  console.log(id_pendaftaran + " " + metode);

  await transaksiService.insertTransaksi({ id_pendaftaran, metode });

  return res.json({ success: true });
};

export const getTransaksi = async (req, res) => {
  const result = await transaksiService.getTransaksi(req.params);

  return res.json({ success: true, result });
};
// =========================================================
// export const checkTodayTransaksi = async (req,res) => {
//     await transaksiSerivce.checkTodayTransaksi(req.params);

//     return res.json({ success : true });
// };
// =========================================================
