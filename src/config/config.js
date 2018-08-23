const Joi = require('joi');

require('dotenv').config();

const envVarSchema = Joi.object().keys({
  NODE_ENV: Joi.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許三種參數
  PORT: Joi.number().default(8080), // 數字且預設值為 8080
  MYSQL_PORT: Joi.number().default(3306),
  MYSQL_HOST: Joi.string().default('127.0.0.1'),
  MYSQL_USER: Joi.string(),
  MYSQL_PASS: Joi.string(),
  MYSQL_NAME: Joi.string(),
  VERSION: Joi.string() // 字串
}).unknown().required();

// process.env 撈取 .env 內的變數做 joi 驗證
const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysqlPort: envVars.MYSQL_PORT,
  mysqlHost: envVars.MYSQL_HOST,
  mysqlUserName: envVars.MYSQL_USER,
  mysqlPass: envVars.MYSQL_PASS,
  mysqlDatabase: envVars.MYSQL_DATABASE
};

// export default config;
module.exports = config;
