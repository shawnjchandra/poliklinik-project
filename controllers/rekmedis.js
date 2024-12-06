import * as rekamMedisService from "../services/rekmedis.js";

export const addNewDiagnosa = async (req,res) => {
    const result = await rekamMedisService.createRekamMedis(req.body);

    return res.json(result);
    
}