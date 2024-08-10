import * as Joi from 'joi';

export const sqlValidation = {
  // SQL Database
  SQL_DB_TYPE: Joi.string().valid('mysql', 'postgres', 'sqlite', 'mariadb', 'mssql').required(),
  SQL_DB_USERNAME: Joi.string().required(),
  SQL_DB_PASSWORD: Joi.string().allow('').optional(),
  SQL_DB_PORT: Joi.number().default(3306).required(),
  SQL_DB_HOST: Joi.string().hostname().required(),
}