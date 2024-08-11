import { OrderQuery } from '@app/common/utils/features/order.query';

export class GetOrdersQuery {
  constructor(public readonly query: OrderQuery) {}
}
