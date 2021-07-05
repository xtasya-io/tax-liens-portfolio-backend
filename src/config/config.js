const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(8000).description('Port on which the application is running'),
        DB_HOST: Joi.string().required().default('localhost').description('MySQL Database host'),
        DB_USERNAME: Joi.string().required().description('MySQL username'),
        DB_PASS: Joi.string().required().description('MySQL password'),
        DB_NAME: Joi.string().required().description('Database Name')
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mysql: {
        dbName: envVars.mysql.DB_NAME,
        host: envVars.DB_HOST,
        username: envVars.DB_USERNAME,
        password: envVars.DB_PASS
    }
}