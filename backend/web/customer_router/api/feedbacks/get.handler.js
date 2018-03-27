const Joi = require('joi');
const Feedback = rootRequire('models').Feedback;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, body }) {
    try {
        const feedback = await Feedback.find({ _id: body._id });
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