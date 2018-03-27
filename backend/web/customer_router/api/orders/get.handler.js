const Joi = require('joi');
const Order = rootRequire('models').Order;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, body }) {
    try {
        const order = await Order.find({ _id: body._id });
        if (!order) throw new ValidationError('order Details do not exist');
        return order;
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