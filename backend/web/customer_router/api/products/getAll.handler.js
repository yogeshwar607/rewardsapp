const Joi = require('joi');
const Product = rootRequire('models').Product;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params, query }) {
    try {
        // const pageNo = params.pageNo;
        // const onPageResults = 10;

        // const products = await Product.find().skip(onPageResults * pageNo)
        //     .limit(onPageResults)
        //     .exec();
        // { "$regex": "Pro", "$options": "i" }
        console.log(params, query.search);
        if (params._id == "search") {
            const products = await Product.find({ "tags": { $in: [new RegExp(query.search, 'i')] } }).exec()
            return { products };

        } else if (params._id == "some") {
            let products;
            if (query.category != undefined || query.brand != undefined) {
                if (!(query.category instanceof Array)) {
                    query.category = [query.category];
                }
                if (!(query.brand instanceof Array)) {
                    query.brand = [query.brand];
                }
            }
            if (query.category == undefined && query.brand != undefined) {
                products = await Product.find({ $or: [{ brand: { $in: query.brand } }] }).populate('brand').exec()

            } else if (query.brand == undefined && query.category != undefined) {
                products = await Product.find({ $or: [{ category: { $in: query.category } }] }).populate('brand').exec()

            } else if (query.brand == undefined && query.category == undefined) {
                products = await Product.find().populate('brand').exec()
            } else {
                products = await Product.find({ $or: [{ category: { $in: query.category } }, { brand: { $in: query.brand } }] }).populate('brand').exec()

            }

            return { products };


        } else if (params._id == "all") {

            const products = await Product.find().populate('brand').exec()

            const totalResults = await Product.count();
            return { products, totalResults };
        } else {

            const products = await Product.find({ brand: params._id }).populate('brand').exec()

            const totalResults = await Product.count({ brand: params._id });
            return { products, totalResults };

        }



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