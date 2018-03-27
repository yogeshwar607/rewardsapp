const Joi = require('joi');
const Category = rootRequire('models').Category;

const { ValidationError } = rootRequire('commons').ERROR;


function enrichBrandObj(body, context) {
    console.log(context);
    return {
        name: body.name,

        interests: body.interests,
        sub_category: body.sub_category,

        updated_by: body.updated_by,
        created_by: body.created_by

    };
}

async function logic({ body, context }) {
    try {
        let categoryObj = enrichBrandObj(body, context);
        let category = await Category.findOne({ name: categoryObj.name });
        if (category) throw new ValidationError('category Name Already Exists');
        categoryObj = new Category(categoryObj);
        console.log(categoryObj);
        return await categoryObj.save();
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