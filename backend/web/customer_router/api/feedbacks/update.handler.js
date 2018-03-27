const Joi = require('joi');
const Feedback = rootRequire('models').Feedback;
const multer = require("multer");
const fs = require('fs');
var uuid = require('node-uuid');
const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, body }) {
    try {
        console.log("cool", body);
        if (context != undefined) {
            body.data.obj.fileUrls = context.images;
        }
        const feedback = await Feedback.update({ _id: body.data.feedbackId }, {
            $push: {
                feedBack_given: body.data.obj
            }
        });
        if (!feedback) throw new ValidationError('Feedback Details do not exist');
        return feedback;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}


function handler(req, res, next) {
    if (req.body.data.obj.survey != undefined || req.body.data.obj.text != undefined) {
        logic(req).then(data => {
                res.json({
                    success: true,
                    data,
                });
            })
            .catch(err => next(err));

    } else {

        console.log(req.body, req);
        const storageImages = multer.diskStorage({
            destination: function(req, file, callback) {
                console.log("des", req.body);
                callback(null, './uploads/feedbackFiles/');

            },
            filename: function(req, file, callback) {
                console.log("%%$%$%", file);
                callback(null, uuid.v4() + file.originalname.slice(file.originalname.lastIndexOf(".")));
            }
        });

        const uploadImages = multer({
            storage: storageImages,
            fileFilter: function(req, file, callback) {
                callback(null, true)
            }
        }).array('imgStore', 6);


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

                for (let i = 0; i < req.files.length; i++) {

                    images.push(req.files[i].path);
                }
                req.context = {};

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


}
module.exports = handler;