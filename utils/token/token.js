import crypto from "crypto";
import fs from "fs";

import { UnauthorizedError } from "../../errors/UnauthorizedError.js";
import { base64urlDecode, base64urlEncode } from "./base64url.js";

const privateKey = fs.readFileSync("./private_key.pem", "utf8");
const publicKey = fs.readFileSync("./public_key.pem", "utf8");

export const generateToken = (header, payload) => {
  const headerJSON = JSON.stringify(header);
  const expirationDate = Date.now() + 1000;

  const payloadJSON = JSON.stringify({ ...payload, iat: Date.now(), expiresIn: expirationDate });

  const headerBase64 = base64urlEncode(headerJSON);
  const payloadBase64 = base64urlEncode(payloadJSON);

  const concatenated = headerBase64 + "." + payloadBase64;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(concatenated);
  sign.end();
  const signature = sign.sign(privateKey, "base64url");

  const token = `${headerBase64}.${payloadBase64}.${signature}`;
  return token;
};

export const verifyToken = (token) => {
  const headerBase64 = token.split(".")[0];
  const payloadBase64 = token.split(".")[1];
  const signatureBase64 = token.split(".")[2];

  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(`${headerBase64}.${payloadBase64}`);
  verify.end();

  const isValid = verify.verify(publicKey, signatureBase64, "base64url");

  if (!isValid) {
    throw new UnauthorizedError("invalid token");
  }

  const payload = JSON.parse(base64urlDecode(payloadBase64));

  return payload;
};
