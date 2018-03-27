const Joi = require('joi');
const Otp = rootRequire('models').Otp;
const Customer = rootRequire('models').Customer;
const jwt = require('jsonwebtoken');
const config = rootRequire('config').server;
const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ body, context }) {
    try {

        const otpObj = await Otp.findOne({ mobile_no: body.mobile_no });
        if (otpObj) {

            if (otpObj.otps[0] == body.otp) {
                if (body.login == true) {
                    let cus = await Customer.findOne({ mobile_no: body.mobile_no });

                    const payloads = {
                        exp: config.jwtExpiry,
                        sub: cus.email,
                    };

                    const token = jwt.sign(payloads, config.jwtSecret);

                    return { otp: true, customer: cus, token: token }
                } else {
                    return { otp: true }

                }
            } else {
                return { otp: false }
            }

        } else {

            throw new ValidationError('OTP do not exists');

        }


        return true;

    } catch (e) {
        logger.error(e);
        throw e;
    }
}


function handler(req, res, next) {

    logic(req).then(data => {
            res.json({
                success: true,
                data,
            });
        })
        .catch(err => next(err));



}
module.exports = handler;