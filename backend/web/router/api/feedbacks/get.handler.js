const Joi = require('joi');
const Feedback = rootRequire('models').Feedback;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    try {
        const feedback = await Feedback.findOne({ _id: params.id }).populate('customer').populate('order').populate('product').populate('feedBack_given.product').exec();
        if (!feedback) throw new ValidationError('Feedback Details do not exist');
        return feedback;
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