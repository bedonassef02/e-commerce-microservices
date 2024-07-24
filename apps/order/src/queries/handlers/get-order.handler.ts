import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { OrderService } from '../../order.service';
import { GetOrderQuery } from '../impl/get-order.query';
import { Order } from '../../entities/order.entity';
import { notFoundException } from '@app/common/utils/exception/not-found.exception';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly orderService: OrderService) {}

  async execute(query: GetOrderQuery): Promise<Observable<Order>> {
    return this.orderService.findById(query.orderDto.order).pipe(
      map((order: Order) => {
        if (!order) {
          notFoundException(Order.name);
        }
        return order;
      }),
    );
  }
}
