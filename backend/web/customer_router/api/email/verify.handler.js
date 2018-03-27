const Joi = require('joi');
const Customer = rootRequire('models').Customer;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    try {

        console.log(params.id);
        let customerObj = await Customer.findOne({ _id: params.id });
        if (!customerObj) throw new ValidationError('Customer Details do not exist');
        let customerUpdate = await Customer.update({ _id: params.id }, { verify: { email: true } });

        return "<h4>Email Verified Successfully</h4>";
    } catch (e) {
        logger.error(e);
        throw e;
    }
}


function handler(req, res, next) {

    logic(req).then(data => {
            res.send(data);
        })
        .catch(err => next(err));



}
module.exports = handler;