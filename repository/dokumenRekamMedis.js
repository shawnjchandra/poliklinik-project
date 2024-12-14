import pool from "../db/db.js";

export const getDokumenRekamMedis = async ({ id_rkm_med }) => {
  const queryText = `SELECT * FROM DokumenRekamMedis WHERE id_rkm_med = $1 AND is_active = TRUE`;
  const values = [id_rkm_med];

  const queryResult = await pool.query(queryText, values);

  return queryResult;
};

export const insertDokumenRekamMedis = async ({ id_rkm_med, dokumen_rekam_medis }, client) => {
  let placeHolderidx = 1;

  const values = [];
  const valuesText = [];
  dokumen_rekam_medis.forEach((doc) => {
    values.push(id_rkm_med, doc.filename);
    valuesText.push(`($${placeHolderidx++}, $${placeHolderidx++})`);
  });

  const queryText = `
          INSERT INTO DokumenRekamMedis (id_rkm_med, path_file)
          VALUES ${valuesText.join(", ")}
          RETURNING id_dkm, uploaded_at, path_file, is_active;
        `;
  let queryResult;
  if (client) {
    queryResult = await client.query(queryText, values);
  } else {
    queryResult = await pool.query(queryText, values);
  }

  return queryResult;
};

export const deleteDokumenRekamMedis = async ({ id_dkm }) => {
  const queryText = `UPDATE DokumenRekamMedis SET is_active = FALSE WHERE id_dkm = $1`;
  const values = [id_dkm];

  const queryResult = await pool.query(queryText, values);
  return queryResult;
};
