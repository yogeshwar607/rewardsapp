const Joi = require('joi');
const Brand = rootRequire('models').Brand;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    try {
        const brand = await Brand.findOne({ _id: params._id });
        if (!brand) throw new ValidationError('Brand Details do not exist');
        return brand;
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