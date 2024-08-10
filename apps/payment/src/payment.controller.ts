import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { CheckoutDto } from '@app/common/dto/payment/checkout.dto';
import { CreateCheckoutSessionCommand } from './commands/impl/create-checkout-session.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SuccessPaymentCommand } from './commands/impl/success-payment.command';

@Controller()
export class PaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.Payment.CHECKOUT)
  checkout(checkoutDto: CheckoutDto) {
    return this.commandBus.execute(
      new CreateCheckoutSessionCommand(checkoutDto),
    );
  }

  @MessagePattern(Commands.Payment.SUCCESS)
  success(order: string) {
    return this.commandBus.execute(new SuccessPaymentCommand(order));
  }
}
