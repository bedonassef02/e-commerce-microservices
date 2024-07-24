import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { from, map } from 'rxjs';
import { ProductService } from '../../product.service';
import { Product } from '../../entities/product.entity';
import { GetProductQuery } from '../impl/get-product.query';
import { notFoundException } from '@app/common/utils/exception/not-found.exception';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productService: ProductService) {}

  async execute(query: GetProductQuery) {
    return from(this.productService.findById(query.id)).pipe(
      map((product: Product) => {
        if (product) {
          return product;
        }
        notFoundException(Product.name);
      }),
    );
  }
}
