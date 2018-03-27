const Joi = require('joi');

const schema = Joi.object().keys({
  client: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  language: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{2,16}$/).required(),
  roles: Joi.array().items(Joi.string().required()),
  is_active: Joi.boolean().required(),
  created_by: Joi.string().required(),
  is_instarem_user: Joi.boolean().required(),
  client_access: Joi.array().items(Joi.string().required()),
  logs: Joi.array().optional(),
});

module.exports = schema;