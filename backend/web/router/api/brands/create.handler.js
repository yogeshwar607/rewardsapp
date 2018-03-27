const Joi = require('joi');
const Brand = rootRequire('models').Brand;
const multer = require("multer");
const fs = require('fs');
var uuid = require('node-uuid');
const { ValidationError } = rootRequire('commons').ERROR;


function enrichBrandObj(body, context) {
    console.log(context);
    return {
        name: body.data.name,
        description: body.data.description,
        videos: body.data.videos,
        images: context.images,
        logoImg: context.logo,
        category: body.data.category,
        headquaters: body.data.headquaters,
        fbLink: body.data.fbLink,
        twitterLink: body.data.twitterLink,
        updatedBy: body.data.updatedBy
    };
}

async function logic({ body, context }) {
    try {
        let brandObj = enrichBrandObj(body, context);
        const brand = await Brand.findOne({ email: brandObj.name });
        if (brand) throw new ValidationError('Brand Name Already Exists');
        brandObj = new Brand(brandObj);
        return await brandObj.save();
    } catch (e) {
        logger.error(e);
        throw e;
    }
}


function handler(req, res, next) {
    console.log(req.body, req.files);
    const storageImages = multer.diskStorage({
        destination: function(req, file, callback) {
            console.log("des", req.body);
            // console.log("des", file);
            // let m = JSON.stringify(req.body);
            // console.log(m.slice(0, req.body.length), JSON.parse(m.slice(0, req.body.length)));
            // req.body = JSON.parse(m.slice(0, req.body.length));
            let x = file;
            // console.log("des", x.originalname);

            if (x.originalname == "img") {
                console.log("img");
                // var dir = './uploads/brands/images/' + req.body.name;
                // if (!fs.existsSync(dir)) {
                //     fs.mkdirSync(dir);
                // }
                callback(null, './uploads/brands/images/');

            } else if (x.originalname == "logo") {
                console.log("logo");
                // var dir = './uploads/brands/logo/' + req.body.name;
                // if (!fs.existsSync(dir)) {
                //     fs.mkdirSync(dir);
                // }
                callback(null, './uploads/brands/logo/');
            }
        },
        filename: function(req, file, callback) {
            callback(null, uuid.v4() + '.jpg');
        }
    });

    const uploadImages = multer({
        storage: storageImages,
        fileFilter: function(req, file, callback) {
            // console.log("befor img", req.body, file);
            callback(null, true)
        }
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
        storage: storageLogo,
        fileFilter: function(req, file, callback) {
            console.log("befor logo", req.body, file);
            callback(null, true)
        }
    }).array('logoStore', 6);



    uploadImages(req, res, function(err) {
        if (err) {
            return logger.error("Error uploading file.");
        } else {
            let m = JSON.stringify(req.body);

            req.body = JSON.parse(m.slice(0, req.body.length));
            req.body.data = JSON.parse(req.body.data);
            // console.log(mm);

            console.log("ss", req.body.data, req.body.data.name);

            let images = [];
            let logo = "";

            for (let i = 0; i < req.files.length; i++) {

                if (req.files[i].originalname == 'img') {
                    images.push(req.files[i].path);
                } else if (req.files[i].originalname == 'logo') {
                    logo = req.files[i].path;
                }
            }
            req.context = {};
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
module.exports = handler;