import { CheckoutDto } from '@app/common/dto/payment/checkout.dto';

export class CreateCheckoutSessionCommand {
  constructor(public readonly checkoutDto: CheckoutDto) {}
}
