const Joi = require('joi');
const Interest = rootRequire('models').Interest;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, body }) {
    try {
        const interest = await Interest.find({ _id: body._id });
        if (!interest) throw new ValidationError('Interest Details do not exist');
        return interest;
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