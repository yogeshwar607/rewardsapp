const Joi = require('joi');
const User = rootRequire('models').User;
const jwt = require('jsonwebtoken');
const config = rootRequire('config').server;

const { customerJoiSchema } = rootRequire('commons').SCHEMA;
const { ValidationError } = rootRequire('commons').ERROR;



async function logic({ body, context }) {
    try {
        console.log(body);
        let user;
        if (body.input.indexOf('@') > 0) { // email
            user = await User.findOne({ email: body.input });
        } else { // mobile no
            user = await User.findOne({ mobile_no: body.input });
        }

        if (!user) {
            return { success: false, login: false, msg: "Invalid Mobile No/ Email  or Password" };
        } else {

            if (user.password == body.password) {

                const payloads = {
                    exp: config.jwtExpiry,
                    sub: user.email,
                };
                const token = jwt.sign(payloads, config.jwtSecret);
                return { success: true, login: true, token: token, user: { name: user.name, _id: user._id } }
            } else {
                return { success: false, login: false, msg: "Invalid UserName or Password" };
            }
        }

    } catch (e) {
        logger.error(e);
        throw e;
    }
}

function handler(req, res, next) {
    logic(req)
        .then(data => {
            res.json({
                success: true,
                data,
            });
        })
        .catch(err => next(err));
}
module.exports = handler;