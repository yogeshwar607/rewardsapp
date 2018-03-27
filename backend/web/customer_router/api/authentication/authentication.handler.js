const co = require('co');
const Joi = require('joi');

const { userDAO } = rootRequire('commons').DAO;
const { AuthorizationError, ValidationError } = rootRequire('commons').ERROR;
const { getErrorMessages } = rootRequire('utils');
const config = rootRequire('config').server;
const jwt = require('jsonwebtoken');

function* logic(req) {
  let user;

  try {
    const authValidationJoi = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
      mobile_no: Joi.string().optional(),
      otp: Joi.number().optional(),
    });
    const { error } = Joi.validate(req.body, authValidationJoi);
    if (error) throw new ValidationError(getErrorMessages(error));
    const _userDAO = userDAO();
    const baseQuery = {
      email: req.body.email.toLowerCase().trim(),
      is_active: true,
    };
    const populateQuery = [];
    user = yield _userDAO.findOne({ baseQuery, populateQuery });
    if (!user) {
      throw new AuthorizationError('Invalid Email Address or Password.');
    }

    if (!user.client.is_active) {
      throw new AuthorizationError(
        'Client is not active. Please contact Brandtouch support.');
    }

    const isMatch = yield user.comparePassword(req.body.password);
    if (!isMatch) {
      throw new AuthorizationError('Invalid Email Address or Password.');
    }

    /** OTP Validation */
    // if (user.otp_expires_at) {
    //   if (parseInt(req.body.otp, 10) !== user.otp) {
    //     throw new AuthorizationError('Incorrect dynamic access code.');
    //   } else if (new Date().getTime() > user.otp_expires_at.getTime()) {
    //     throw new AuthorizationError('Dynamic access code expired.');
    //   }
    // } else {
    //   throw new Error('Please contact Brandtouch support.');
    // }

    const payloads = {
      exp: config.jwtExpiry(),
      sub: user.id,
    };
    const token = jwt.sign(payloads, config.jwtSecret);

    // Remove the password and irrelevant information from user object
    user = user.toObject();
    delete user.password;

    return { token, user };
  } catch (e) {
    throw e;
  } finally {
    logger.info('Logging the user login details');
  }
}

function handler(req, res, next) {
  co(logic(req))
    .then(data => {
      res.json({
        success: true,
        data,
      });
    })
    .catch(err => next(err));
}
module.exports = handler;
