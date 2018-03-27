const Joi = require('joi');
const Customer = rootRequire('models').Customer;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    try {
        const pageNo = params.pageNo;
        const onPageResults = 10;

        const customers = await Customer.find().skip(onPageResults * pageNo)
            .limit(onPageResults)
            .exec();

        const totalResults = await Customer.count({});

        return { customers, totalResults };
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