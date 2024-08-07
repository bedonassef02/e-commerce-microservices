import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly successUrl: string;
  private readonly cancelUrl: string;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
    );
    this.successUrl = this.configService.get<string>('STRIPE_SUCCESS_URL');
    this.cancelUrl = this.configService.get<string>('STRIPE_CANCEL_URL');
  }

  createCheckoutSession(
    items: Stripe.Checkout.SessionCreateParams.LineItem[],
    user: string,
  ): Observable<string> {
    return from(
      this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items,
        mode: 'payment',
        success_url: `${this.successUrl}?user=${user}`,
        cancel_url: this.cancelUrl,
      }),
    ).pipe(map((session: Stripe.Checkout.Session) => session.url));
  }
}
