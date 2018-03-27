const Joi = require('joi');
const Customer = rootRequire('models').Customer;
const Otp = rootRequire('models').Otp;

// const indexMapping = rootRequire('models').IndexMapping;

const { customerJoiSchema } = rootRequire('commons').SCHEMA;
const { ValidationError } = rootRequire('commons').ERROR;

function enrichCustomerObj(body) {
    return {
        name: body.name,
        email: body.email,
        password: body.password,
        mobile_no: body.mobile_no,
        dob: body.dob,
        state: body.state,
        city: body.city,
        country: body.country,
        is_active: body.is_active,
        interests: body.interests,
        // addressess: body.addressess,
        gender: body.gender
    };
}

async function logic({ body, context }) {
    try {
        console.log(body);
        const CustomerObj = enrichCustomerObj(body, context);
        // const { error } = Joi.validate(CustomerObj, customerJoiSchema);
        // if (error) throw new ValidationError(`Customer Validation Error : ${error.message}`);
        const customer = await Customer.findOne({ email: CustomerObj.email });
        if (customer) throw new ValidationError('Email already exists');
        console.log(CustomerObj);

        const CustomerOb = new Customer(CustomerObj);
        let custo = await CustomerOb.save();

        const otpOb = { customer: custo._id };
        const otpObj = new Otp(otpOb);
        await otpObj.save();

        return custo;
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