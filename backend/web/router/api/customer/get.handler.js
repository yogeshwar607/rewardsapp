const Joi = require('joi');
const Customer = rootRequire('models').Customer;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    try {
        const customer = await Customer.findOne({ _id: params.id }).populate('interests').exec();
        if (!customer) throw new ValidationError('Customer Details do not exist');
        return customer;
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