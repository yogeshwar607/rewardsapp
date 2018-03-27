const Joi = require('joi');
const User = rootRequire('models').User;

const { ValidationError } = rootRequire('commons').ERROR;

async function logic({ context, params }) {
    try {
        // const pageNo = params.pageNo;
        // const onPageResults = 10;

        // const Users = await User.find().skip(onPageResults * pageNo)
        //     .limit(onPageResults)
        //     .exec();

        const users = await User.find();

        const totalResults = await User.count();

        return { users, totalResults };

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