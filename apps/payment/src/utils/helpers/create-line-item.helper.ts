import { Product } from '../../../../product/src/entities/product.entity';
import Stripe from 'stripe';
import { applyDiscount } from './apply-discount.helper';
import { getDescription } from './get-description.helper';

export function createLineItem(
  product: Product,
  discount: number,
): Stripe.Checkout.SessionCreateParams.LineItem {
  return {
    quantity: product.stock,
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name,
        // images: [product.image],
        description: getDescription(
          product.description,
          product.price,
          discount,
        ),
      },
      unit_amount: applyDiscount(product.price, discount) * 100,
    },
  };
}
