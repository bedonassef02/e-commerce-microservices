import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { FindOrderDto } from '@app/common/dto/order/find-order.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetOrderQuery } from './queries/impl/get-order.query';
import { GetOrdersQuery } from './queries/impl/get-orders.query';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';
import { CreateOrderCommand } from './commands/impl/create-order.command';
import { UpdateOrderStatusCommand } from './commands/impl/update-order-status.command';
import { OrderQuery } from '@app/common/utils/features/order.query';

@Controller()
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.Crud.CREATE)
  create(orderDto: CreateOrderDto) {
    return this.commandBus.execute(new CreateOrderCommand(orderDto));
  }

  @MessagePattern(Commands.Crud.FIND_ALL)
  findAll(query: OrderQuery) {
    return this.queryBus.execute(new GetOrdersQuery(query));
  }

  @MessagePattern(Commands.Crud.FIND_BY_ID)
  findById(orderDto: FindOrderDto) {
    return this.queryBus.execute(new GetOrderQuery(orderDto));
  }

  @MessagePattern(Commands.Crud.UPDATE)
  update(@Payload() data: any) {
    const { id, status } = data;
    return this.commandBus.execute(new UpdateOrderStatusCommand(id, status));
  }
}
