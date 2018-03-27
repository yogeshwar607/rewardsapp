const Joi = require('joi');
const msg91 = require("msg91")("171951AcXFnkyO0b59a3a279", "TRYYIN", "4");
const Otps = rootRequire('models').Otp;
const Customer = rootRequire('models').Customer;

// const sendOtp = new SendOtp('171951AcXFnkyO0b59a3a279', 'TRYYIN,Otp for your order is {{otp}}, please do not share it with anybody');

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ body, context }) {
    try {

        let random = Math.floor(Math.random() * 9000) + 1000;
        //send otp
        // await msg91.send("91" + body.mobile_no, "TRYYIN,Verification Otp is " + random + ", please do not share it with anybody");

        // console.log(Otps);

        let otpObj = await Otps.findOne({ mobile_no: body.mobile_no });
        if (otpObj) {

            await Otps.update({ _id: otpObj._id }, {
                $push: {
                    otps: {
                        $each: [random],
                        $position: 0
                    }
                }
            });
            return true;

        } else {

            if (body.login == true) {
                let cus = await Customer.findOne({ mobile_no: body.mobile_no });
                if (!cus) {
                    return false;
                }

            } else {
                const otpObj = new Otps({ mobile_no: body.mobile_no, otps: [random] });
                await otpObj.save();
                return true;

            }




        }


        // });
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