// import service
import * as pendaftaranService from "../services/pendaftaran.js";

export const getRiwayatPendaftaranPasien = async (req, res) => {
  const id_pasien = req.params.id_pasien;
  const id_pendaftaran = req.query.id_pendaftaran;

  if (id_pendaftaran) {
    const riwayatPendaftaranPasien =
      await pendaftaranService.getPendaftaranPasienById(
        id_pasien,
        id_pendaftaran
      );

    return res.json(riwayatPendaftaranPasien);
  } else {
    const riwayatPendaftaranPasien =
      await pendaftaranService.getRiwayatPendaftaranPasien(id_pasien);

    return res.json(riwayatPendaftaranPasien);
  }
};

// const addPendaftaran
export const addPendaftaranOnline = async (req, res) => {
  const newPendaftaran = await pendaftaranService.addPendaftaranOnline(
    req.body
  );

  return res.json(newPendaftaran);
};

export const getPendaftaran = async (req, res) => {
  const { status } = req.query;
  const pendaftaran = await pendaftaranService.getPendaftaran({ status });
  return res.json(pendaftaran);
};

export const getPendaftaranPemanggilan = async (req, res) => {
  const pendaftaran = await pendaftaranService.getPendaftaranPemanggilan();
  return res.json(pendaftaran);
};

export const addPendaftaranOffline = async (req, res) => {
  await pendaftaranService.addPendaftaranOffline(req.body);

  return res.json({ success: true });
};

export const updateStatus = async (req, res) => {
  const { id_pendaftaran } = req.params;
  const { status } = req.body;
  await pendaftaranService.updateStatus({ status, id_pendaftaran });

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

export const getPendaftaranDokter = async (req, res) => {
  const { id_pendaftaran } = req.params;

  const pendaftaranDokter = await pendaftaranService.getPendaftaranDokter({
    id_pendaftaran,
  });

  return res.json(pendaftaranDokter);
};
