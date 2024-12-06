
import { BadRequestError } from "../errors/BadRequestError.js";
import * as rekMedRepo from "../repository/rekmedis.js";

// Perawat selalu rekam medis yang baru , dan hanya edit informasi dasar pasien yang itu saja

// Dokter bisa lihat semua rekam medis yang pernah ada, tapi hanya bisa tambah diagnosa pasien untuk yang saat itu saja
export const createRekamMedis = async ({id_pasien}) => {
    await rekMedRepo.createRekamMedis(id_pasien);
    const result = await rekMedRepo.getLatestRekamMedisByIdPasien(id_pasien);

    const rekMed = result.rows[0];

    const id = rekMed.id_rkm_med;

    return id;
};


export const updateInformasiDasar = async ({tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi, id_pasien, id_rkm_med}) => {
    
    const available = await checkAvailabilityRKM(id_pasien);

    if(!available){
        throw new BadRequestError("There is no 'rekam medis' available for this user ");
    }
     
    rekMedRepo.updateInformasiDasar(tinggi_badan, berat_badan, golongan_darah, diastolik, sistolik, denyut_nadi, id_rkm_med);


};

export const updateDiagnosaPasien = async ({resep_obat, prognosis, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan, id_pasien, id_rkm_med}) => {
    
    const available = await checkAvailabilityRKM(id_pasien);

    if(!available){
        throw new BadRequestError("There is no 'rekam medis' available for this user ");
    }

    rekMedRepo.updateDiagnosaPasien(resep_obat, prognosis, diag_penunjang, pemeriksaan_fisik, pemeriksaan_penunjang, riwayat_penyakit, keluhan, id_rkm_med);
    
};

export const getRekamMedis = async ({id_rkm_med}) => {
    const queryResult = await rekMedRepo.getRekamMedisByIdRM(id_rkm_med);

};

const checkAvailabilityRKM = async ({id_pasien}) => {
    const rekamMedisQueryResult = await rekMedRepo.getRekamMedisByIdPasien(id_pasien);

    return rekamMedisQueryResult.rowCount > 0 ? true : false; 
};


