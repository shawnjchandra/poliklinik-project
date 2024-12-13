import * as rekamMedisService from "../services/rekmedis.js";
import * as dokumenRekamMedisService from "../services/dokumenRekamMedis.js";

export const createNewRekamMedis = async (req, res) => {
  const { id_pasien } = req.params;

  console.log("dalam controller " + id_pasien);

  const result = await rekamMedisService.createRekamMedis({ id_pasien });

  return res.json(result);
};

export const updateInformasiDasar = async (req, res) => {
  const { id_rkm_med } = req.params;
  const { tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi } = req.body;

  const result = await rekamMedisService.updateInformasiDasar({ tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi, id_rkm_med, dokumen_rekam_medis: req.files });

  return res.json({ success: true, ...result });
};

export const updateDiagnosaPasien = async (req, res) => {
  const { id_rkm_med } = req.params;
  const { resep_obat, prognosis_tindakan_lanjut, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan } = req.body;

  const result = await rekamMedisService.updateDiagnosaPasien({ resep_obat, prognosis_tindakan_lanjut, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan, id_rkm_med });

  return res.json(result);
};

export const getInformasiDasar = async (req, res) => {
  const { id_rkm_med } = req.params;

  const rkmMed = await rekamMedisService.getInformasiDasarRekamMedis({ id_rkm_med });
  const dokumenRekamMed = await dokumenRekamMedisService.getDokumenRekamMedis({ id_rkm_med });

  return res.json({ rekam_medis: rkmMed, dokumen_rekam_medis: dokumenRekamMed });
};

export const getDiagnosisRekamMedis = async (req, res) => {
  const { id_rkm_med } = req.params;
  const diagnosis = await rekamMedisService.getDiagnosisRekamMedis({ id_rkm_med });

  return res.json(diagnosis);
};

export const getRekamMedisPasien = async (req, res) => {
  const { id_pasien } = req.params;

  const rkmMed = await rekamMedisService.getRekamMedisPasien({ id_pasien });

  return res.json(rkmMed);
};

export const deleteDokumenRekamMedis = async (req, res) => {
  const { id_dkm } = req.params;

  await dokumenRekamMedisService.deleteDokumenRekamMedis({ id_dkm });

  return res.json({ success: true });
};
