import pool from "../db/db.js";

export const getAllPendaftaranTuntas = async () => {
    const queryText = "SELECT * FROM Pendaftaran WHERE status = 'tuntas' AND tanggal_daftar = CURRENT_DATE;";

    const queryResult = await pool.query(queryText);

    // console.log(queryResult);
    
    return queryResult.rows;

};

export const getPendaftaranTuntas = async ({id_pendaftaran}) => {

    
    const queryText = "SELECT * FROM Pendaftaran WHERE status = 'tuntas' AND tanggal_daftar = CURRENT_DATE AND id_pendaftaran = $1";
    
    const values = [id_pendaftaran];
    
    const queryResult = await pool.query(queryText, values);
    
    return queryResult.rows;
    
};



// // Default in ke tunai dulu aja gitu?
// export const generateTransaksi = async ({id_pendaftaran}) => {
//     console.log("dalam generate transaksi");
    
//     const biaya_total = await getBiayaTotal(id_pendaftaran);
    
//     console.log(biaya_total)

//     const queryText = "INSERT INTO Transaksi (metode, biaya_total,id_pendaftaran) VALUES ($1, $2, $3)";
    
//     //TODO:  Default ketika pertama kali generate (nanti deh edit sql nya)
//     const values = ['tunai', biaya_total, id_pendaftaran];
    
//     const queryResult = await pool.query(queryText,values);

//     return queryResult;

// };


export const insertTransaksi = async ({id_pendaftaran,biaya_total ,metode}) => {

    const queryText = "INSERT INTO Transaksi (metode, biaya_total, id_pendaftaran) VALUES ($1, $2, $3) ";

    const values = [metode,biaya_total, id_pendaftaran];

    const queryResult = await pool.query(queryText,values);

    return queryResult;
};

// Untuk sementara ini dulu, aku belum nyamain yang kayak di pendaftaran
// export const checkTodayTransaksi = async ({id_pendaftaran}) => {
    
    
//     const queryText = "SELECT * FROM Transaksi tr JOIN Pendaftaran p ON tr.id_pendaftaran = p.id_pendaftaran WHERE tr.id_pendaftaran = $1 AND P.tanggal_daftar = CURRENT_DATE";
    
//     const values = [id_pendaftaran];
    
//     const queryResult = await pool.query(queryText,values);
//     console.log(queryResult);
    
//     return queryResult;
// };

export const getAllTransaksi = async ()=>{
    const queryText = "SELECT * FROM Transaksi tr JOIN Pendaftaran p ON tr.id_pendaftaran = p.id_pendaftaran WHERE p.tanggal_daftar = CURRENT_DATE";
    
    const queryResult = await pool.query(queryText);
    console.log(queryResult);
    
    return queryResult;
};

export const getTransaksi = async ({id_pendaftaran})=>{
    const queryText = "SELECT * FROM Transaksi tr JOIN Pendaftaran p ON tr.id_pendaftaran = p.id_pendaftaran WHERE tr.id_pendaftaran = $1 AND p.tanggal_daftar = CURRENT_DATE";
    
    const values = [id_pendaftaran];

    const queryResult = await pool.query(queryText,values);
    console.log(queryResult);
    
    return queryResult.rows[0];
};



export const getBiayaTotal = async ({id_pegawai}) => {


    // const id_pegawai = await getIdDokter({id_pendaftaran});

    let queryText = "SELECT p.biaya_kunjungan FROM JadwalPraktikDokter jpd JOIN Pegawai p ON jpd.id_pegawai = p.id_pegawai WHERE jpd.id_pegawai = $1";
    
    const values = [id_pegawai];
    
    const queryResult = await pool.query(queryText,values);

    return queryResult.rows[0].biaya_kunjungan;
};


export const getIdDokter = async ({id_pendaftaran}) => {



    const queryText = "SELECT id_pegawai FROM Pendaftaran p JOIN JadwalPraktikDokter jpd ON p.id_jadwal = jpd.id_jadwal AND p.id_pendaftaran = $1";

    const values = [id_pendaftaran];

    const queryResult = await pool.query(queryText,values);

    // console.log(queryResult.rows[0].id_pegawai);

    return queryResult.rows[0].id_pegawai;
}

// Update