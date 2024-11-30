export const extendedGcd = (a, b) => {
    // Ensure BigInt inputs
    a= BigInt(a);
    b= BigInt(b);

    // Handle base case
    if (b === 0n) {
        return { gcd: BigInt(a), s: 1n, t: 0n };
    }

    // Recursive implementation
    let { gcd, s, t } = extendedGcd(b, a % b);
    
    // Compute new coefficients
    return {
        gcd: BigInt(gcd),
        s: BigInt(t),
        t: BigInt(s - t * ((a / b) || 0n))
    };
}

export const gcd = (a,b) => {
    // console.log(a+" in gcd "+b)
    a= BigInt(a);
    b= BigInt(b);

    if (a == 0)return b;
    return gcd(b % a, a);
}

