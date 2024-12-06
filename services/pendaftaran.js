import * as pendaftaranRepo from "../repository/pendaftaran.js";

export const addPendaftaranOnline = async ({tanggal_daftar, id_pasien}) => {
    const result = await pendaftaranRepo.addPendaftaran({status: 'pendaftaran',tanggal_daftar,id_pasien});

    return result;
};
export const addPendaftaranOffline = async ({tanggal_daftar, id_pasien}) => {
    const result = await pendaftaranRepo.addPendaftaran({status: 'pemanggilan',tanggal_daftar,id_pasien});

    return result;
};

export const updateStatus = async ({status, id_pendaftaran})=>{
    const result = await pendaftaranRepo.updateStatus({status,id_pendaftaran});

    return result;
}

export const updateAntrian = async ({antrian, id_pendaftaran})=>{
    const result = await pendaftaranRepo.updateAntrian({antrian,id_pendaftaran});

    return result;
}