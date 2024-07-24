import { FindOrderDto } from '@app/common/dto/order/find-order.dto';

export class GetOrderQuery {
  constructor(public readonly orderDto: FindOrderDto) {}
}
