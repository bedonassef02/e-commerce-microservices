import { OrderQuery } from '@app/common/utils/features/order.query';
import { OrderFilter } from '@app/common/utils/filters/order.filter';

export function orderFilter(query: OrderQuery): OrderFilter {
  const filter: OrderFilter = {};

  if (query.user) {
    filter.user = query.user;
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.min_price) {
    filter.price = { ...filter.price, $gte: query.min_price };
  }

  if (query.max_price) {
    filter.price = { ...filter.price, $lte: query.max_price };
  }

  if (query.has_coupon !== undefined) {
    filter.coupon = query.has_coupon == true ? { $ne: null } : { $eq: null };
  }

  if (query.payment) {
    filter.payment = query.payment;
  }

  return filter;
}
