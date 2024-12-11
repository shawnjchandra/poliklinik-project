import * as transaksiSerivce from "../services/transaksi.js";

export const getAllTransaksi = async (req,res) => {
    const list = transaksiSerivce.getAllTransaksi();

    return res.json({ success : true, list});

};

export const checkTodayTransaksi = async (req,res) => {
    await transaksiSerivce.checkTodayTransaksi(req.params);
    
    return res.json({ success : true });
};

export const updateActiveTransaksi = async (req,res) =>{
    const {id_pendaftaran} = req.params;

    const {metode} = req.body;

    console.log(id_pendaftaran+" "+metode)

    await transaksiSerivce.updateActiveTransaksi({id_pendaftaran, metode});

    return res.json({ success : true});
    
};    

export const getTransaksi = async (req,res) => {
    
    const result = await transaksiSerivce.getTransaksi(req.params);
    
    return res.json({ success: true, result});
};    
