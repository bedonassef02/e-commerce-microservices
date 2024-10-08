import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SuccessPaymentCommand } from '../impl/success-payment.command';
import { Inject } from '@nestjs/common';
import { ORDER_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { OrderStatus } from '../../../../order/src/utils/order-status';

@CommandHandler(SuccessPaymentCommand)
export class SuccessPaymentHandler
  implements ICommandHandler<SuccessPaymentCommand>
{
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderService: ClientProxy,
  ) {}

  async execute(command: SuccessPaymentCommand) {
    return this.orderService.send(Commands.Crud.UPDATE, {
      id: command.order,
      status: OrderStatus.PAID,
    });
  }
}
