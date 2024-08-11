import * as Joi from 'joi';

export const mailValidation = {
  // Email Service
  SERVICE_NAME: Joi.string().required(),
  EMAIL_ADDRESS: Joi.string().email().required(),
  EMAIL_PASSWORD: Joi.string().required(),
};
