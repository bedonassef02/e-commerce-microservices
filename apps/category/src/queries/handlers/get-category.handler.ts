import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Category } from '../../entities/category.entity';
import { from, map, Observable } from 'rxjs';
import { GetCategoryQuery } from '../impl/get-category.query';
import { CategoryService } from '../../category.service';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(query: GetCategoryQuery): Promise<Observable<Category>> {
    return from(this.categoryService.findById(query.id)).pipe(
      map((category: Category) => {
        if (category) {
          return category;
        }
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          error: 'Category not found',
        });
      }),
    );
  }
}
