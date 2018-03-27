const Joi = require("joi");
const User = rootRequire("models").User;

// const indexMapping = rootRequire('models').IndexMapping;

const { userJoiSchema } = rootRequire("commons").SCHEMA;
const { ValidationError } = rootRequire("commons").ERROR;

function enrichUserObj(body, context) {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
    mobile_no: body.mobile_no
  };
}

async function logic({ body, context }) {
  try {
    // const _userDAO = userDAO();
    const userObj = enrichUserObj(body, context);
    // const { error } = Joi.validate(userObj, userJoiSchema);
    // if (error) throw new ValidationError(`User Validation Error : ${error.message}`);
    const user = await User.findOne({ email: userObj.email });
    if (user) throw new ValidationError("Email already exists");
    let userOb = new User(userObj);
    return await userOb.save();
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

function handler(req, res, next) {
  logic(req)
    .then(data => {
      res.json({
        success: true,
        data,
      });
    })
    .catch(err => next(err));
}
module.exports = handler;
