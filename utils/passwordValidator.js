import { BadRequestError } from "../errors/BadRequestError";
import { getPassword } from "../repository/pasien";

export const isPasswordValid = (password) =>{

    /*Password Policty
        - Long = min 16 chars
        - Random = mixed lower-capital alphabets, numbers, symbols
        - Unique -> cuman ada 1 (debatable)
    */
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{16,}$/;
    
    // const isUnique = getPassword(password).length === 0 ? true : false ;
    
    return passwordRegex.test(password);

}