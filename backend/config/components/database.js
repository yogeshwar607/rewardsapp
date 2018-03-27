const joi = require('joi');

const envVarsSchema = joi
  .object({
    DB: joi
      .string()
      .valid(['brandtouch-staging', 'brandtouch-development'])
      .required(),
    DB_URI: joi
      .string()
      .valid(['localhost', 'sid:test@ds249545.mlab.com:49545', 'sid:test@ds149905.mlab.com:49905'])
      .required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  db: envVars.DB,
  dbURI: envVars.DB_URI,
  connectionString: `mongodb://${envVars.DB_URI}/${envVars.DB}`,
};


module.exports = config;
