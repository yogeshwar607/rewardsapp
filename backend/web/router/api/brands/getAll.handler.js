const Joi = require('joi');
const Brand = rootRequire('models').Brand;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    try {
        const pageNo = params.pageNo;
        const onPageResults = 10;

        // const brands = await Brand.find().skip(onPageResults * pageNo)
        //     .limit(onPageResults)
        //     .exec();

        const brands = await Brand.find();

        const totalResults = await Brand.count({});

        return { brands, totalResults };
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