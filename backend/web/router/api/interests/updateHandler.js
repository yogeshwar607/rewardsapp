const Joi = require('joi');
const Interest = rootRequire('models').Interest;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ body, context }) {
    try {
        // const brandObj = enrichBrandObj(body, context);
        const interest = await Interest.findOne({ _id: body._id });
        if (!interest) throw new ValidationError('No Interest Error');

        // interest.status = body.status;
        interest.name = body.name;
        interest.category = body.category;
        interest.updatedBy = body.updatedBy;

        let interestObj = new Interest(interest);
        return await InterestObj.save();

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