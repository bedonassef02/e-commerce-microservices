import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { CheckoutDto } from '@app/common/dto/payment/checkout.dto';
import { CreateCheckoutSessionCommand } from './commands/impl/create-checkout-session.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

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
    return order;
  }
}
