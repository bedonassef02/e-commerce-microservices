import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriesQuery } from '../impl/get-categories.query';
import { CategoryService } from '../../category.service';
import { PaginationResponse } from '@app/common/utils/types/pagination-response.type';
import { Category } from '../../entities/category.entity';
import { forkJoin, map } from 'rxjs';
import { CategoryQuery } from '@app/common/utils/features/category.query';

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {
  constructor(private categoryService: CategoryService) {}

  async execute(
    categoriesQuery: GetCategoriesQuery,
  ): Promise<PaginationResponse> {
    const query: CategoryQuery = categoriesQuery.query;
    query.filter = this.categoryService.filter(query);
    return this.paginate(query).toPromise();
  }

  private paginate(query: CategoryQuery) {
    const findAll$ = this.categoryService.findAll(query);
    const countDocuments$ = this.categoryService.countDocuments(query);

    return forkJoin([findAll$, countDocuments$]).pipe(
      map(([data, count]: [Category[], number]) => {
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
