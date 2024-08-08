import { Inject, Injectable } from '@nestjs/common';
import { StripeService } from './services/stripe.service';
import { Observable } from 'rxjs';
import { PRODUCT_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { CheckoutDto } from '@app/common/dto/payment/checkout.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(private readonly stripeService: StripeService) {}

  checkout(
    items: Stripe.Checkout.SessionCreateParams.LineItem[],
    user: string,
  ): Observable<string> {
    return this.stripeService.createCheckoutSession(items, user);
  }
}
