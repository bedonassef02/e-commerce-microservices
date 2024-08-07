import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { FindOrderDto } from '@app/common/dto/order/find-order.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetOrderQuery } from './queries/impl/get-order.query';
import { GetOrdersQuery } from './queries/impl/get-orders.query';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';

@Controller()
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.CREATE)
  create(orderDto: CreateOrderDto) {
    // return this.orderService.create(orderDto);
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

  // @MessagePattern(Commands.UPDATE)
  // update(id: string, updateOrderDto: CreateOrderDto): Observable<Order> {
  //   return this.orderService.update(id, updateOrderDto);
  // }

  // @MessagePattern(Commands.DELETE)
  // remove(id: string): Observable<Order> {
  //   return this.orderService.remove(id);
  // }
}
