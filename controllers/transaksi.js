import * as transaksiSerivce from "../services/transaksi.js";

export const getAllPendaftaranTuntas = async (req,res) => {
    const list = await transaksiSerivce.getAllPendaftaranTuntas();

    // console.log(list);

    return res.json({ success : true, list});

};

export const insertTransaksi = async (req,res) =>{
    const {id_pendaftaran} = req.params;

    const {metode} = req.body;

    console.log(id_pendaftaran+" "+metode)

    await transaksiSerivce.insertTransaksi({id_pendaftaran, metode});

    return res.json({ success : true});
    
};    

export const getTransaksi = async (req,res) => {
    
    const result = await transaksiSerivce.getTransaksi(req.params);
    
    return res.json({ success: true, result});
};    
// =========================================================
export const checkTodayTransaksi = async (req,res) => {
    await transaksiSerivce.checkTodayTransaksi(req.params);
    
    return res.json({ success : true });
};
// =========================================================

