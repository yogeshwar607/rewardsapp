const Joi = require('joi');

const schema = Joi.object().keys({
  client_id: Joi.number().required(),
  client_name: Joi.string().required(),
  client_label: Joi.string().required(), // e.g.:DEMO-1001
  client_code: Joi.string().required(),
  client_address: Joi.string().required(),
  client_city: Joi.string().required(),
  client_pincode: Joi.number().required(),
  client_country: Joi.string().required(),
  client_base_currency: Joi.string().required(),
  client_invoice_currency: Joi.string().required(),
  client_invoice_currency_from_date: Joi.date().required(),
  is_active: Joi.boolean().required(),
  created_by: Joi.string().required(),
  logs: Joi.array().optional(),
});

module.exports = schema;