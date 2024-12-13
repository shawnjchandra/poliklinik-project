import * as transaksiRepo from "../repository/transaksi.js";

export const getAllPendaftaranTuntas = async () => {

    const result = await transaksiRepo.getAllPendaftaranTuntas();

    // console.log(result);

    return result;
};

export const insertTransaksi = async ({id_pendaftaran, metode}) =>{
 

    console.log("id transaksi1 : " + id_pendaftaran );
    const biaya_total = await transaksiRepo.getBiayaTotal({id_pendaftaran});
    console.log("id transaksi2 : " + id_pendaftaran );
    
    const id_transaksi = await transaksiRepo.getTransaksi({id_pendaftaran});
    console.log("id transaksi3 : " + id_pendaftaran );
    

    const result = await transaksiRepo.insertTransaksi({id_pendaftaran,biaya_total,metode});

    return result;
    
};    

export const getTransaksi = async ({id_pendaftaran}) => {
    
    const result = await transaksiRepo.getTransaksi({id_pendaftaran});
    
    return result;
};    

// export const getAllTransaksi = async ({})

// ==================================================================
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
// ==================================================================
