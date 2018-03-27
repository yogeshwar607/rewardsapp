const Joi = require('joi');
const Feedback = rootRequire('models').Feedback;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    try {
        // const pageNo = params.pageNo;
        // const onPageResults = 10;

        const feedbacks = await Feedback.find().populate('customer').populate('order').populate('product').exec()

        const totalResults = await Feedback.count({});

        return { feedbacks, totalResults };
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