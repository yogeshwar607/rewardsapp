const Joi = require('joi');
const Customer = rootRequire('models').Customer;

const { customerJoiSchema } = rootRequire('commons').SCHEMA;
const { ValidationError } = rootRequire('commons').ERROR;


async function logic({ body, context }) {
    try {
        let customer;
        console.log(body);
        if (body.obj == undefined) {
            customer = await Customer.update({ _id: body._id }, body);
            if (!customer) throw new ValidationError('no user to update');
        } else {
            customer = await Customer.update({ _id: body._id }, {
                $push: {
                    addressess: body.obj
                }
            });
            if (!customer) throw new ValidationError('no user to update');
        }



        return customer;
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