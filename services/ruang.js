import * as RuangRepo from "../repository/ruang.js";

export const getAllRuang = async () => {
  const queryResult = await RuangRepo.getAllRuang();

  return queryResult.rows;
};
