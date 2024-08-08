import { Injectable } from '@nestjs/common';
import { StripeService } from './services/stripe.service';
import { Observable } from 'rxjs';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(private readonly stripeService: StripeService) {}

  checkout(
    items: Stripe.Checkout.SessionCreateParams.LineItem[],
    order: string,
  ): Observable<string> {
    return this.stripeService.createCheckoutSession(items, order);
  }
}
