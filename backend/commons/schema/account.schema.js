const Joi = require('joi');

const schema = Joi.object().keys({
  client: Joi.string().required(),
  account_number: Joi.string().required(),
  currency: Joi.string().required(),
  label: Joi.string().required(),
  is_default_account: Joi.boolean().required(),
  is_active: Joi.boolean().required(),
  created_by: Joi.string().required(),
  logs: Joi.array().optional(),
});

module.exports = schema;