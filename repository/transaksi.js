import pool from "../db/db.js";

export const getAllTransaksi = async () => {
    const queryText = "SELECT * FROM Pendaftaran WHERE status = 'tuntas' AND tanggal_daftar = CURRENT_DATE";

    const queryResult = await pool.query(queryText);
    
    return queryResult;

};

export const getTransaksi = async ({id_pendaftaran}) => {
    const queryText = "SELECT * FROM Pendaftaran WHERE status = 'tuntas' AND tanggal_daftar = CURRENT_DATE AND id_pendaftaran = $1";

    const values = [id_pendaftaran];

    const queryResult = await pool.query(queryText, values);
    
    return queryResult;

};



// Default in ke tunai dulu aja gitu?
export const generateTransaksi = async ({id_pendaftaran}) => {

    const biaya_total = await getBiayaTotal(id_pendaftaran);

    const queryText = "INSERT INTO Transaksi (metode, biaya_total,id_pendaftaran) VALUES ($1, $2, $3)";

    //TODO:  Default ketika pertama kali generate (nanti deh edit sql nya)
    const values = ['tunai', biaya_total, id_pendaftaran];

    const queryResult = await pool.query(queryText,values);

    return queryResult;

};

export const updateActiveTransaksi = async ({id_transaksi ,metode}) => {

    const queryText = "UPDATE Transaksi SET metode = $1 WHERE id_transaksi = $2 ";

    const values = [metode, id_transaksi];

    const queryResult = await pool.query(queryText,values);

    return queryResult;
};

// Untuk sementara ini dulu, aku belum nyamain yang kayak di pendaftaran
export const checkTodayTransaksi = async ({id_pendaftaran}) => {
    const queryText = `SELECT * FROM Transaksi tr JOIN Pendaftaran p ON tr.id_pendaftaran = p.id_pendaftaran WHERE tr.id_pendaftaran = $1 AND P.tanggal_daftar = CURRENT_DATE`;

    const values = [id_pendaftaran];

    const queryResult = await pool.query(queryText,values);

    return queryResult;
};

const getBiayaTotal = async (id_pendaftaran) => {

    const idDokter = await getIdDokter(id_pendaftaran);

    let queryText = "SELECT p.biaya_kunjungan FROM JadwalPraktikDokter jpd JOIN Pegawai p ON jpd.id_pegawai = p.id_pegawai WHERE jpd.id_pegawai = $1";

    const values = [idDokter];

    const queryResult = await pool.query(queryText,values);

    return queryResult;
};


const getIdDokter = async (id_pendaftaran) => {
    const queryText = "SELECT id_pegawai From Pegawai WHERE id_pegawai = $1";

    const values = [id_pendaftaran];

    const queryResult = await pool.query(queryText,values);

    return queryResult;
}
