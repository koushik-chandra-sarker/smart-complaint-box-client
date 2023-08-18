export function generateOTP(limit) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return {code:OTP, generateTime:Date.now()};
}
