import { Inject, Injectable } from '@nestjs/common';
import { CartProduct } from '../../cart/src/utils/product-cart';
import { StripeService } from './services/stripe.service';
import { PRODUCT_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { from, map, mergeMap, Observable, toArray } from 'rxjs';
import { Product } from '../../product/src/entities/product.entity';
import Stripe from 'stripe';
import { createLineItem } from './utils/helpers/create-line-item.helper';

@Injectable()
export class PaymentService {
  constructor(
    private readonly stripeService: StripeService,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
  ) {}

  checkout(
    cartProducts: CartProduct[],
    user: string,
    discount: number = 0,
  ): Observable<string> {
    return this.getLineItems(cartProducts, discount).pipe(
      mergeMap((lineItems) =>
        this.stripeService.createCheckoutSession(lineItems, user),
      ),
    );
  }

  private getLineItems(
    cartProducts: CartProduct[],
    discount: number,
  ): Observable<Stripe.Checkout.SessionCreateParams.LineItem[]> {
    return from(cartProducts).pipe(
      mergeMap((cartProduct) => this.getProductLineItem(cartProduct, discount)),
      toArray(),
    );
  }

  private getProductLineItem(
    cartProduct: CartProduct,
    discount: number,
  ): Observable<Stripe.Checkout.SessionCreateParams.LineItem> {
    return this.productService
      .send<Product>(Commands.FIND_BY_ID, cartProduct.product)
      .pipe(
        map((product: Product) =>
          createLineItem(product, cartProduct.quantity, discount),
        ),
      );
  }
}
