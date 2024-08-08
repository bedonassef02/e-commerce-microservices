import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCheckoutSessionCommand } from '../impl/create-checkout-session.command';
import { PaymentService } from '../../payment.service';
import { from, map, mergeMap, Observable, of, toArray } from 'rxjs';
import Stripe from 'stripe';
import { Product } from '../../../../product/src/entities/product.entity';
import { createLineItem } from '../../utils/helpers/create-line-item.helper';

@CommandHandler(CreateCheckoutSessionCommand)
export class CreateCheckoutSessionHandler
  implements ICommandHandler<CreateCheckoutSessionCommand>
{
  constructor(private readonly paymentService: PaymentService) {}

  async execute(command: CreateCheckoutSessionCommand) {
    const { user, products, discount } = command.checkoutDto;
    return this.getLineItems(products, discount).pipe(
      mergeMap((lineItems) => this.paymentService.checkout(lineItems, user)),
    );
  }

  private getLineItems(
    products: Product[],
    discount: number,
  ): Observable<Stripe.Checkout.SessionCreateParams.LineItem[]> {
    return from(products).pipe(
      mergeMap((cartProduct) => this.getProductLineItem(cartProduct, discount)),
      toArray(),
    );
  }

  private getProductLineItem(
    product: Product,
    discount: number,
  ): Observable<Stripe.Checkout.SessionCreateParams.LineItem> {
    return of(createLineItem(product, discount));
  }
}
