const Joi = require('joi');
const Category = rootRequire('models').Category;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, body }) {
    try {
        const category = await Category.find();
        if (!category) throw new ValidationError('category Details do not exist');
        return { category };
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