import * as transaksiRepo from "../repository/transaksi.js";

export const getAllTransaksi = async () => {
    const tanggal_daftar = Date.now()

    const result = await transaksiRepo.getAllTransaksi();

    return result;
};

export const checkTodayTransaksi = async ({id_pendaftaran}) => {
    const isExists = await transaksiRepo.checkTodayTransaksi({id_pendaftaran});
    
    let transaksi;
    if(isExists){
        transaksi = await transaksiRepo.getTransaksi({id_pendaftaran});
    }else {
        transaksi = await transaksiRepo.generateTransaksi({id_pendaftaran});
    }

    return transaksi;
};

export const updateActiveTransaksi = async ({id_transaksi, metode}) =>{
    const result = await transaksiRepo.updateActiveTransaksi({id_transaksi,metode});

    return result;
    
};    

export const getTransaksi = async ({id_pendaftaran}) => {
    
    const result = await transaksiRepo.getTransaksi({id_pendaftaran});
    
    return result;
};    
