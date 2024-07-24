import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { OrderService } from '../../order.service';
import { Order } from '../../entities/order.entity';
import { GetOrdersQuery } from '../impl/get-orders.query';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(private readonly orderService: OrderService) {}

  async execute(query: GetOrdersQuery): Promise<Observable<Order[]>> {
    return this.orderService.findAll(query.user);
  }
}
