import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { from, map, Observable } from 'rxjs';
import { ProductService } from '../../product.service';
import { Product } from '../../entities/product.entity';
import { GetProductQuery } from '../impl/get-product.query';
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productService: ProductService) {}

  async execute(query: GetProductQuery): Promise<Observable<Product>> {
    return from(this.productService.findById(query.id)).pipe(
      map((product: Product) => {
        if (product) {
          return product;
        }
        new RpcException({
          status: HttpStatus.NOT_FOUND,
          error: 'Product not found',
        });
      }),
    );
  }
}
