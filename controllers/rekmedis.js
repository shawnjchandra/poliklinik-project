import * as rekamMedisService from "../services/rekmedis.js";

export const createNewRekamMedis = async (req, res) => {
  const { id_pasien } = req.params;

  console.log("dalam controller " + id_pasien);

  const result = await rekamMedisService.createRekamMedis({ id_pasien });

  return res.json(result);
};

export const updateInformasiDasar = async (req, res) => {
  const { id_rkm_med } = req.params;
  const { tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi } = req.body;

  const result = await rekamMedisService.updateInformasiDasar({ tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi, id_pasien });

  return res.json({ success: true, ...result });
};

export const updateDiagnosaPasien = async (req, res) => {
  const { id_pasien } = req.params;
  const { resep_obat, prognosis, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan } = req.body;

  const result = await rekamMedisService.updateDiagnosaPasien({ resep_obat, prognosis, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan, id_pasien });

  return res.json(result);
};
