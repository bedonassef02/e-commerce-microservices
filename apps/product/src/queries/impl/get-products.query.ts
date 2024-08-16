import { ProductQuery } from '@app/common/utils/features/product.query';

export class GetProductsQuery {
  constructor(public readonly query: ProductQuery) {}
}
