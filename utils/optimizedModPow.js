export const modPow = (base, exponent, modulus) => {
    base = BigInt(base);
    exponent = BigInt(exponent);
    modulus = BigInt(modulus);

    let result = BigInt(1);
    base = base % modulus;

    while (exponent > 0) {
        // If the current bit of the exponent is 1
        if (exponent % BigInt(2) === BigInt(1)) {
            result = (result * base) % modulus;
        }
        // Square the base
        base = (base * base) % modulus;
        // Shift the exponent to the right
        exponent = exponent / BigInt(2);
    }

    return result;
}