import * as pendaftaranRepo from "../repository/pendaftaran.js";
import { formatDate } from "../utils/dateFormatter.js";

// tanggal_daftar langsung dari program
export const addPendaftaranOnline = async ({id_pasien}) => {
    const tanggal_daftar = Date.now() + (1000*60*60*24);
    
    const formattedDate = formatDate(tanggal_daftar);
    
    const result = await pendaftaranRepo.addPendaftaran({status: 'pendaftaran', tanggal_daftar: formattedDate,id_pasien});
    
    return result;
};

// tanggal_daftar langsung dari program + 1 hari
export const addPendaftaranOffline = async ({id_pasien}) => {
    const tanggal_daftar = Date.now();

    const formattedDate = formatDate(tanggal_daftar);
    
    const result = await pendaftaranRepo.addPendaftaran({status: 'pemanggilan', tanggal_daftar: formattedDate, id_pasien});

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