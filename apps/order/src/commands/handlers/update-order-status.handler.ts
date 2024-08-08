import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderStatusCommand } from '../impl/update-order-status.command';
import { OrderService } from '../../order.service';
import { OrderStatus } from '../../utils/order-status';
import { UpdateOrderDto } from '@app/common/dto/order/update-order.dto';

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusHandler
  implements ICommandHandler<UpdateOrderStatusCommand>
{
  constructor(private readonly orderService: OrderService) {}

  async execute(command: UpdateOrderStatusCommand) {
    const orderDto: UpdateOrderDto = { status: OrderStatus.PAID };
    return this.orderService.update(command.id, orderDto);
  }
}
