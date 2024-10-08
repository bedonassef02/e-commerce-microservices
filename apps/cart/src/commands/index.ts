import { AddToCartHandler } from './handlers/add-to-cart.handler';
import { ClearCartHandler } from './handlers/clear-cart.handler';
import { RemoveFromCartHandler } from './handlers/remove-from-cart.handler';
import { CreateCartHandler } from './handlers/create-cart.handler';

export const cartHandlers = [
  AddToCartHandler,
  ClearCartHandler,
  RemoveFromCartHandler,
  CreateCartHandler,
];
