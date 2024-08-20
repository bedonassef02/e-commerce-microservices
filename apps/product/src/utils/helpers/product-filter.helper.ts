import { ProductFilter } from '@app/common/utils/filters/product.filter';
import { ProductQuery } from '@app/common/utils/features/product.query';

export function productFilter(query: ProductQuery): ProductFilter {
  const filter: ProductFilter = {};

  if (query.category) {
    filter.category = query.category;
  }

  if (query.min_price) {
    filter.price = { ...filter.price, $gte: query.min_price };
  }

  if (query.max_price) {
    filter.price = { ...filter.price, $lte: query.max_price };
  }

  return filter;
}
