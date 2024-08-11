import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { forkJoin, from, map, Observable } from 'rxjs';
import { GetProductsQuery } from '../impl/get-products.query';
import { ProductService } from '../../product.service';
import { Product } from '../../entities/product.entity';
import { CategoryQuery } from '@app/common/utils/features/category.query';
import { Category } from '../../../../category/src/entities/category.entity';
import { ProductQuery } from '@app/common/utils/features/product.query';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly productService: ProductService) {}

  async execute(productsQuery: GetProductsQuery){
    const query: ProductQuery = productsQuery.query;
    query.filter = this.productService.filter(query);
    return this.paginate(query).toPromise();
  }

  private paginate(query: ProductQuery) {
    const findAll$ = this.productService.findAll(query);
    const countDocuments$ = this.productService.countDocuments(query);

    return forkJoin([findAll$, countDocuments$]).pipe(
      map(([data, count]: [Product[], number]) => {
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
