const Joi = require('joi');
const Interest = rootRequire('models').Interest;

const { ValidationError } = rootRequire('commons').ERROR;


function enrichBrandObj(body, context) {
    console.log(context);
    return {
        name: body.name,

        category: body.category,

        updated_by: body.updated_by,
        created_by: body.created_by

    };
}

async function logic({ body, context }) {
    try {
        let interestObj = enrichBrandObj(body, context);
        let interest = await Interest.findOne({ name: interestObj.name });
        if (interest) throw new ValidationError('Interest Name Already Exists');
        interestObj = new Interest(interestObj);
        console.log(interestObj);
        return await interestObj.save();
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