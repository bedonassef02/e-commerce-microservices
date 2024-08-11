import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { forkJoin, map, Observable } from 'rxjs';
import { OrderService } from '../../order.service';
import { Order } from '../../entities/order.entity';
import { GetOrdersQuery } from '../impl/get-orders.query';
import { CategoryQuery } from '@app/common/utils/features/category.query';
import { Category } from '../../../../category/src/entities/category.entity';
import { OrderQuery } from '@app/common/utils/features/order.query';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(private readonly orderService: OrderService) {}

  async execute(ordersQuery: GetOrdersQuery) {
    const query = ordersQuery.query;
    query.filter = this.orderService.filter(query);
    return this.paginate(query);
  }

  private paginate(query: OrderQuery) {
    const findAll$ = this.orderService.findAll(query);
    const countDocuments$ = this.orderService.countDocuments(query);

    return forkJoin([findAll$, countDocuments$]).pipe(
      map(([data, count]: [Order[], number]) => {
        const totalPages: number = Math.ceil(count / query.limit);
        const currentPage: number = query.page;
        return {
          data,
          count,
          totalPages,
          currentPage,
        };
      }),
    );
  }
}
