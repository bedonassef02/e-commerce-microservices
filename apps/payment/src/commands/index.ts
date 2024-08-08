import { CreateCheckoutSessionHandler } from './handlers/create-checkout-session.handler';
import { SuccessPaymentHandler } from './handlers/success-payment.handler';

export const paymentHandlers = [
  CreateCheckoutSessionHandler,
  SuccessPaymentHandler,
];
