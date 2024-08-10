import * as Joi from 'joi';

export const mongoValidation = {
  // Mongo DATABASE
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_URI: Joi.string().uri().required(),
}