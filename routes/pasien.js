import express from "express";
import { registerPasien } from "../controllers/pasien.js";
import { loginPasien } from "../controllers/pasien.js";
import { validateLogin, validateRegister } from "../middleware/validator/pasien.js";
import { encode, decode } from "../utils/token/base64url.js";

import { decrypt, encrypt, keyGeneration, test } from "../utils/token/rsa.js";
import { sha256 } from "../utils/token/sha256.js";
import { hashPassword } from "../utils/encryptPassword.js";

const router = express.Router();

router.post("/register", validateRegister, registerPasien);

router.post("/login", validateLogin, loginPasien, encrypt);

//Bikin key, encode base64url header & payload, signature (RSA () )
router.post("/key",keyGeneration);

router.post("/resendData", /*Proses ambil header dan payload dari*/ encrypt );
//email, password -> name, role, exp,  

router.post("/validate", decrypt);
router.post("/hash", hashPassword);

// router.post("/encode", encode);
// router.post("/decode", decode);
// router.post("/tes", test);


// router.post("/sha",sha256);

// router.post("/inject", isPasswordInjection );

export default router;
