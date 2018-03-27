const Joi = require('joi');
const Product = rootRequire('models').Product;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    console.log(params._id)
    try {
        const product = await Product.findOne({ _id: params._id }).populate('brand').exec();
        if (!product) throw new ValidationError('Product Details do not exist');
        return product;
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