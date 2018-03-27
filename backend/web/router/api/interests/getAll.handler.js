const Joi = require('joi');
const Interest = rootRequire('models').Interest;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    try {
        // const pageNo = params.pageNo;
        // const onPageResults = 10;

        const interests = await Interest.find().populate('category');

        const totalResults = await Interest.count({});

        return { interests, totalResults };
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