export const isPassFormatCorrect = (password) => {
  return password.length >= 8;
  /*Password Policty
        - Long = min 16 chars
        - Random = mixed lower-capital alphabets, numbers, symbols
        - Unique -> cuman ada 1 (debatable)
    */
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{16,}$/;

  // const isUnique = getPassword(password).length === 0 ? true : false ;

  return passwordRegex.test(password);
};

export const isPasswordInjection = (password) => {
  const sqlInjectionRegex = /['"=;# \-\*()]/;

  return sqlInjectionRegex.test(password);
};
