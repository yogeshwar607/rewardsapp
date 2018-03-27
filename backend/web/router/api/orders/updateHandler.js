const Joi = require('joi');
const Order = rootRequire('models').Order;
const Feedback = rootRequire('models').Feedback;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ body, context }) {
    try {
        // const brandObj = enrichBrandObj(body, context);
        const order = await Order.update({ _id: body._id }, { status: body.status });
        if (!order) throw new ValidationError('No order Error');
        if (body.status == 'Delivered') {
            const feedback = await Feedback.update({ order: body._id }, { isDelivered: true });
            if (!feedback) throw new ValidationError('No feedback Error');
        }


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