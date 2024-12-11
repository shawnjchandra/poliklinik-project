import * as transaksiRepo from "../repository/transaksi.js";

export const getAllPendaftaranTuntas = async () => {

    const result = await transaksiRepo.getAllPendaftaranTuntas();

    return result;
};

export const checkTodayTransaksi = async ({id_pendaftaran}) => {

    console.log("id pendaftaran"+id_pendaftaran);
    
    const isExists = await transaksiRepo.checkTodayTransaksi({id_pendaftaran});
    
    let transaksi;
    if(isExists.rows[0] != null){
        transaksi = await transaksiRepo.getTransaksi({id_pendaftaran});
    }else {
        transaksi = await transaksiRepo.generateTransaksi({id_pendaftaran});
    }
    console.log("isExists "+isExists);
    
    return transaksi;
};

export const updateActiveTransaksi = async ({id_pendaftaran, metode}) =>{
 

    console.log("id transaksi : " + id_pendaftaran );
    const id_transaksi = await transaksiRepo.getTransaksi({id_pendaftaran});


    const result = await transaksiRepo.updateActiveTransaksi({id_transaksi,metode});

    return result;
    
};    

export const getTransaksi = async ({id_pendaftaran}) => {
    
    const result = await transaksiRepo.getTransaksi({id_pendaftaran});
    
    return result;
};    
