const Joi = require('joi');
const Customer = rootRequire('models').Customer;
const jwt = require('jsonwebtoken');
const config = rootRequire('config').server;

const { customerJoiSchema } = rootRequire('commons').SCHEMA;
const { ValidationError } = rootRequire('commons').ERROR;



async function logic({ body, context }) {
    try {
        console.log(body);
        let customer;
        if (body.input.indexOf('@') > 0) { // email
            customer = await Customer.findOne({ email: body.input });
        } else { // mobile no
            customer = await Customer.findOne({ mobile_no: body.input });
        }

        if (!customer) {
            return { success: false, login: false, msg: "Invalid User Name or Password" };
        } else {
            if (customer.is_active == false) {
                return { success: false, login: false, msg: "Please contact Support. Account Disabled" };
            }
            if (customer.password == body.password) {

                const payloads = {
                    exp: config.jwtExpiry,
                    sub: customer.email,
                };
                const token = jwt.sign(payloads, config.jwtSecret);
                return { success: true, login: true, token: token, user: { name: customer.name, _id: customer._id } }
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