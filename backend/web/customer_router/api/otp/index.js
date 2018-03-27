const sendOtpHandler = require('./senOtp.handler');
const verifyOtp = require('./verifyOtp.handler');

module.exports = (router) => {

    router.post('/otp/send', sendOtpHandler);
    router.post('/otp/verify', verifyOtp);

};