const Joi = require('joi');
const Order = rootRequire('models').Order;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    try {
        // const pageNo = params.pageNo;
        // const onPageResults = 10;

        const orders = await Order.find().populate('products').exec()

        const totalResults = await Order.count({});

        return { orders, totalResults };
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