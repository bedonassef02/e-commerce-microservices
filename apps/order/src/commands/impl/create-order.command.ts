import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';

export class CreateOrderCommand {
  constructor(public readonly orderDto: CreateOrderDto) {}
}
