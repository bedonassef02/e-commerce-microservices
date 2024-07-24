import { Cart } from '../entites/cart.entity';

export function productIndex(cart: Cart, product: string): number {
  return cart.products.findIndex((p) => p.product == product);
}
