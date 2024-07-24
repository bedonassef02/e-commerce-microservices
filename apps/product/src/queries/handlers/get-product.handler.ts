import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { from, map } from 'rxjs';
import { ProductService } from '../../product.service';
import { Product } from '../../entities/product.entity';
import { GetProductQuery } from '../impl/get-product.query';
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productService: ProductService) {}

  async execute(query: GetProductQuery) {
    return from(this.productService.findById(query.id)).pipe(
      map((product: Product) => {
        if (product) {
          return product;
        }
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'Product not found',
        });
      }),
    );
  }
}
