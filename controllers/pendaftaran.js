// import service
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import * as pendaftaranService from "../services/pendaftaran.js";

export const getRiwayatPendaftaranPasien = async (req, res) => {
  const id_pasien = req.params.id_pasien;
  const id_pendaftaran = req.query.id_pendaftaran;

  if (id_pendaftaran) {
    const riwayatPendaftaranPasien = await pendaftaranService.getPendaftaranPasienById(id_pasien, id_pendaftaran);

    return res.json(riwayatPendaftaranPasien);
  } else {
    const riwayatPendaftaranPasien = await pendaftaranService.getRiwayatPendaftaranPasien(id_pasien);

    return res.json(riwayatPendaftaranPasien);
  }
};

// const addPendaftaran
export const addPendaftaranOnline = async (req, res) => {
  const { id_jadwal } = req.body;
  const { id_pasien } = req.user;
  const newPendaftaran = await pendaftaranService.addPendaftaranOnline({ id_pasien, id_jadwal });

  return res.json(newPendaftaran);
};

export const getPendaftaran = async (req, res) => {
  const { status } = req.query;
  const { role, id_pegawai } = req.user;

  let pendaftaran;
  if (status === "pemeriksaan" && role === "dokter") {
    pendaftaran = await pendaftaranService.getPendaftaranDokter({ id_pegawai });
  } else {
    pendaftaran = await pendaftaranService.getPendaftaran({ status });
  }

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
  const { role } = req.user;

  const allowedUpdate = {
    dokter: ["tuntas"],
    perawat: ["dokter", "pemeriksaan"],
  };

  if (!allowedUpdate[role].includes(status)) {
    throw new UnauthorizedError("you are not able to perform this action");
  }

  const requiredPrevStatus = {
    dokter: "pemanggilan",
    pemeriksaan: "dokter",
    tuntas: "pemeriksaan",
  };

  const prevStatus = requiredPrevStatus[status];

  await pendaftaranService.updateStatus({ status, id_pendaftaran, prevStatus });

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
