// import crypto from "crypto"


export const sha256 = async (message)=>{


    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    
    const algo = "SHA-256";

    // Jalanin algoritma SHA-256
    const hash = await crypto.subtle.digest(algo,data);

    
    const hashArray = Array.from(new Uint8Array(hash));
    
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2,"0")).join("");

    return hashHex;

    


}

// maxLength = 3
// fillstring = "0"

// ex1 : "abcd" => "abcd"