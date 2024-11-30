import { BadRequestError } from "../../errors/BadRequestError.js";
import { modPow } from "../optimizedModPow.js";
import { decode, encode } from "./base64url.js";

import { extendedGcd, gcd } from "./gcd.js";
import { sha256 } from "./sha256.js";



export const encrypt = async (req,res) =>{
    const {header,payload} = req.data;

    //Concat hash header dan payload
    let hashed = await hash(header,payload);

    const encodedHeader = encode(JSON.stringify(header));
    const encodedPayload = encode(JSON.stringify(payload));


    //Sambungkan encoded
    const concatenatedFormat = encodedHeader +"."+encodedPayload;

    //Ubah menjadi bigInt (untuk dapat dilakukan RSA Sign (eksponensial))
    const m = BigInt('0x'+hashed);

    // console.log(m);
    const n = BigInt(JSON.parse(process.env.PRIME_NUMBERS_P) * JSON.parse(process.env.PRIME_NUMBERS_Q));
    //Error Handling

    //Ambil private key dari env
    let SECRET_KEY = BigInt(JSON.parse(process.env.SECRET_KEY));
    //Signature pake private key
    console.log(SECRET_KEY);
    // const signature = BigInt(Math.pow(m,Number(SECRET_KEY)) % Number(n));
    const signature = modPow(m,SECRET_KEY,n);

    //Ubah (encode) signature ke Base64URL
    const encodedSignature = encode(signature.toString().replace("n",""));

    const token = concatenatedFormat+"."+encodedSignature;

    return res.json(token);
}

export const decrypt = async (req,res) =>{
    console.log(req.body);
    
    const token  = req.body.token;
    console.log(token)
    //Pisah token ke bagian masing"
    const splittedToken= token.split(".");
    let encodedHeader = splittedToken[0];
    let encodedPayload = splittedToken[1];
    let encodedSignature = splittedToken[2];

    // console.log({encodedHeader, encodedPayload, encodedSignature});
    //Decode untuk header, payload, dan signature
    console.log("signature "+encodedSignature);
    let header = JSON.parse(decode(encodedHeader));
    let payload = JSON.parse(decode(encodedPayload));


    //Format signature ke Big Integer
    let signature = BigInt(decode(encodedSignature));
    
    


    //Hitung nilai hash dari header dan payload
    let hashed = await hash(header,payload);

    let computatedHash = BigInt(`0x${hashed}`);

    const n = BigInt(
        JSON.parse(process.env.PRIME_NUMBERS_P) *
         JSON.parse(process.env.PRIME_NUMBERS_Q));

    //Un-sign 
    let PUBLIC_KEY  = BigInt(process.env.PUBLIC_KEY);
    // const m = BigInt(signature ** PUBLIC_KEY % n);
    const m = modPow(signature,PUBLIC_KEY,n);
    
    console.log(m);
    console.log(computatedHash);

    //Validasi signature
    if (m.toString() === computatedHash){

        // TODO: Timestamp diperbaharui jika sudah invalid

        return res.json(m);

    }

    //Signature tidak sesuai
    return new BadRequestError("SAHA MANEH");

}

async function hash(header,payload){
    //Encode header & payload (Base64URL)


    const encodedHeader = encode(JSON.stringify(header));
    const encodedPayload = encode(JSON.stringify(payload));


    //Sambungkan encoded
    const concatenatedFormat = encodedHeader +"."+encodedPayload;
    
    // Hashing with SHA256
    const hashed = await sha256(concatenatedFormat);
    return hashed;
} 

/*
    Private Key Server
    -> disimpan oleh server untuk nge-sign message

    Public Key Server
    -> DIKIRIM KE client

    Client yg check

*/


// 1 time proses(process cukup
export const keyGeneration = (req,res, next) => {
    const p = BigInt((process.env.PRIME_NUMBERS_P));

    const q = BigInt((process.env.PRIME_NUMBERS_Q));

    
    const n = p*q;
    const phi = (p-1n) * (q-1n);

    let e = generateEncryptionExponent(phi);
    let d = computeDecryptionExponent(e,phi);
    
    ssshhhh(e,d);
    
    return res.json({success:true});
}

function generateEncryptionExponent(phi){

    // angka relatif prima dengan phi
    // TODO : e lebih baik random relative prime to phi
    let e=47n;
    
    console.log(gcd(e,phi));

    while(gcd(e,phi) !== 1n){
        e += 2n;
    }
    console.log("e: "+e);
    

    return e;

}

function computeDecryptionExponent(e, phi) {

    let d = BigInt(extendedGcd(e, phi).s);

    while (d<1n){
        d+=phi;
    }

    return d;
}

function ssshhhh(e,d){
    //Secret /Private Key
    process.env.SECRET_KEY = d;

    //Public
    process.env.PUBLIC_KEY = e;

    
}

export const test = (req,res) =>{
    return res.json(process.env.SECRET_KEY);
}

