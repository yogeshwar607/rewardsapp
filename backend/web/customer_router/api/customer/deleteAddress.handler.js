const Joi = require('joi');
const Customer = rootRequire('models').Customer;

const { customerJoiSchema } = rootRequire('commons').SCHEMA;
const { ValidationError } = rootRequire('commons').ERROR;


async function logic({ body, context }) {
    try {
        let customer;
        console.log(body);

        customer = await Customer.update({ _id: body._id }, { $pull: { "addressess": { _id: body.address._id } } });
        if (!customer) throw new ValidationError('no user to update');




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