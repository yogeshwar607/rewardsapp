const Joi = require('joi');
const Order = rootRequire('models').Order;
const Feedback = rootRequire('models').Feedback;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ body, context }) {
    try {
        // const brandObj = enrichBrandObj(body, context);

        let orderObj = new Order(body);
        let o = await orderObj.save();
        let fedObj = new Feedback({
            customer: body.customer,
            product: body.products,
            order: o._id,
            status: "Pending",
            isDelivered: false

        });
        let f = await fedObj.save();

        return { order: o, feedback: f }

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