const Joi = require('joi');
const Brand = rootRequire('models').Brand;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ body, context }) {
    try {
        // const brandObj = enrichBrandObj(body, context);
        const brand = await Brand.findOne({ _id: body._id });
        if (!brand) throw new ValidationError('No Brand Error');

        brand.name = body.name;
        brand.description = body.description;
        brand.videos = body.videos;
        // brand.brandimages = context.images;
        brand.logoImg = context.logo;
        brand.category = body.category;
        brand.headquaters = body.headquaters;
        brand.fbLink = body.fbLink;
        brand.twitterLink = body.twitterLink;
        brand.updatedBy = body.updatedBy;

        for (let i = 0; i < brand.deleteBrandimages.length; i++) {

            brand.brandimages.splice(brand.brandimages.indexOf(brand.deleteBrandimages[i]), 1);

        }
        for (let i = 0; i < context.images.length; i++) {
            brand.brandimages.push(context.images[i]);
        }
        let brandObj = new Brand(brand);
        return await brandObj.save();

    } catch (e) {
        logger.error(e);
        throw e;
    }
}


function handler(req, res, next) {
    const storageImages = multer.diskStorage({
        destination: function(req, file, callback) {
            var dir = './uploads/brands/images/' + req.body.name;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            callback(null, './uploads/brands/images/' + req.body.name + '/');
        },
        filename: function(req, file, callback) {
            callback(null, req.body.name + '-' + uuid.v4() + '.jpg');
        }
    });

    const uploadImages = multer({
        storage: storageImages
    }).array('imgStore', 6);

    const storageLogo = multer.diskStorage({
        destination: function(req, file, callback) {
            var dir = './uploads/brands/logo/' + req.body.name;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            callback(null, './uploads/brands/logo/' + req.body.name + '/');
        },
        filename: function(req, file, callback) {
            callback(null, req.body.name + '-' + uuid.v4() + '.jpg');
        }
    });

    const uploadLogo = multer({
        storage: storageImages
    }).array('logoStore', 6);

    uploadImages(req, res, function(err) {
        if (err) {
            return logger.error("Error uploading file.");
        } else {
            let images = req.files;
            uploadLogo(req, res, function(err) {
                if (err) {
                    return logger.error("Error uploading file.");
                } else {
                    let logo = req.files[0];
                    req.context.logo = logo;
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
    });

}
module.exports = handler;