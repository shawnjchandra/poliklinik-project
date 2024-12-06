// STATUS_DAFTAR ('pendaftaran','pemanggilan','dokter', 'pemeriksaan','tuntas');
import pool from "../db/db.js";

/*
    Method : Untuk mendaftarkan pasien
    Param  : Status = 'pendaftaran' atau 'pemanggilan' berdasarkan daftar secara online atau offline (pet)
             tanggal_daftar = tanggal pendaftaran pasien
              * untuk offline dan online, sama" pas daftar ulang di petugas administrasi?
            id_pasien = id dari pasien 
*/  
export const addPendaftaran = async ({status, tanggal_daftar, id_pasien}) => {
    const queryText = "INSERT INTO Pendaftaran (status, tanggal_daftar, id_pasien) VALUES ($1, $2, $3)";

    const values = [status,tanggal_daftar, id_pasien];

    const queryResult = await pool.query(queryText,values);

    return queryResult;
};

/*
    Method : ubah status dari sebuah pendaftaran 
*/
export const updateStatus = async ({status, id_pendaftaran}) => {
    const queryText = "UPDATE Pendaftaran SET status = $1 WHERE id_pendaftaran = $2";

    const values = [status,id_pendaftaran];

    const queryResult = await pool.query(queryText, values);

    return queryResult;
};

export const updateAntrian = async ({antrian, id_pendaftaran}) =>{
    const queryText = "UPDATE Pendaftaran SET antrian = $1 WHERE id_pendaftaran = $2"

    const values = [antrian, id_pendaftaran];

    const queryResult = await pool.query(queryText, values);

    return queryResult;
}

