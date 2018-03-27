const Joi = require('joi');
const Order = rootRequire('models').Order;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ body, context }) {
    try {
        // const brandObj = enrichBrandObj(body, context);
        const order = await Order.findOne({ _id: body._id });
        if (!order) throw new ValidationError('No order Error');

        order.status = body.status;


        let orderObj = new Order(order);
        return await orderObj.save();

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