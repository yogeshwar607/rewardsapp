const Joi = require('joi');
const Product = rootRequire('models').Product;
const fs = require('fs');
const uuid = require('node-uuid');
const { ValidationError } = rootRequire('commons').ERROR;


function enrichproductObj(body, context) {
    return {
        name: body.name,
        description: body.description,
        brand: body.brand,
        images: context.images,
        videos: body.videos,
        category: body.category,
        no_of_available_items: body.no_of_available_items,
        total_Qunatity: body.total_Qunatity,
        survey: body.survey,
        target_audience: {
            age: {
                min: body.target_audience.age.min,
                max: body.target_audience.age.max
            },
            gender: body.target_audience.gender,
            location: body.target_audience.location,
        },
        updatedBy: body.updatedBy
    };
}

async function logic({ body, context }) {
    try {
        const product = await product.findOne({ _id: body._id });
        if (!product) throw new ValidationError('product not Exists');

        product.name = body.name;
        product.description = body.description;
        product.brand = body.brand;
        // product.images = context.images;
        product.videos = body.videos;
        product.category = body.category;
        product.no_of_available_items = body.no_of_available_items;
        product.total_Qunatity = body.total_Qunatity;
        product.survey = body.survey;
        product.target_audience = {
            age: {
                min: body.target_audience.age.min,
                max: body.target_audience.age.max
            },
            gender: body.target_audience.gender,
            location: body.target_audience.location,
        };
        product.updatedBy = body.updatedBy;


        for (let i = 0; i < body.deleteBrandimages.length; i++) {

            product.images.splice(product.images.indexOf(body.deleteBrandimages[i]), 1);

        }
        for (let i = 0; i < context.images.length; i++) {
            product.images.push(context.images[i]);
        }

        let productObj = new Product(product);
        return await productObj.save();
    } catch (e) {
        logger.error(e);
        throw e;
    }
}


function handler(req, res, next) {
    const storageImages = multer.diskStorage({
        destination: function(req, file, callback) {
            var dir = './uploads/products/images/' + req.body.name;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            callback(null, './uploads/products/images/' + req.body.name + '/');
        },
        filename: function(req, file, callback) {
            callback(null, req.body.name + '-' + uuid.v4() + '.jpg');
        }
    });

    const uploadImages = multer({
        storage: storageImages
    }).array('imgStore', 6);

    uploadImages(req, res, function(err) {
        if (err) {
            return logger.error("Error uploading file.");
        } else {
            let images = req.files;

            req.context.images = images;
            logic(req).then(data => {
                    res.json({
                        success: true,
                        data,
                    });
                })
                .catch(err => next(err));



        }
    });

}
module.exports = handler;