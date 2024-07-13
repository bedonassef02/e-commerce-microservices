import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { from, Observable } from 'rxjs';
import { GetProductsQuery } from '../impl/get-products.query';
import { ProductService } from '../../product.service';
import { Product } from '../../entities/product.entity';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly productService: ProductService) {}

  async execute(query: GetProductsQuery): Promise<Observable<Product[]>> {
    return from(this.productService.findAll());
  }
}
