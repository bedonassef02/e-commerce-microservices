import * as Joi from 'joi';

export const paymentValidation = {
  // Stripe Payment
  STRIPE_SECRET_KEY: Joi.string(),
  STRIPE_SUCCESS_URL: Joi.string().uri(),
  STRIPE_CANCEL_URL: Joi.string().uri(),
}