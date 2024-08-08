import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { FindOrderDto } from '@app/common/dto/order/find-order.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetOrderQuery } from './queries/impl/get-order.query';
import { GetOrdersQuery } from './queries/impl/get-orders.query';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';
import { CreateOrderCommand } from './commands/impl/create-order.command';
import { UpdateOrderDto } from '@app/common/dto/order/update-order.dto';
import { UpdateOrderStatusCommand } from './commands/impl/update-order-status.command';

@Controller()
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.CREATE)
  create(orderDto: CreateOrderDto) {
    return this.commandBus.execute(new CreateOrderCommand(orderDto));
  }

  @MessagePattern(Commands.FIND_ALL)
  findAll(user: string) {
    console.log({ user });
    return this.queryBus.execute(new GetOrdersQuery(user));
  }

  @MessagePattern(Commands.FIND_BY_ID)
  findById(orderDto: FindOrderDto) {
    return this.queryBus.execute(new GetOrderQuery(orderDto));
  }

  @MessagePattern(Commands.UPDATE)
  update(@Payload() data: any) {
    const { id, status } = data;
    return this.commandBus.execute(new UpdateOrderStatusCommand(id, status));
  }
}
