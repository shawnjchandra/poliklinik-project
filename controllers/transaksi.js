import * as transaksiSerivce from "../services/transaksi.js";

export const getAllTransaksi = async (req,res) => {
    const list = transaksiSerivce.getAllTransaksi();

    return res.json({ success : true, list});

};

export const checkTodayTransaksi = async (req,res) => {
    await transaksiSerivce.checkTodayTransaksi(req.body);
    
    return res.json({ success : true });
};

export const updateActiveTransaksi = async (req,res) =>{
    await transaksiSerivce.updateActiveTransaksi(req.body);

    return res.json({ success : true});
    
};    

export const getTransaksi = async (req,res) => {
    
    const result = await transaksiSerivce.getTransaksi(req.body);
    
    return res.json({ success: true, result});
};    
