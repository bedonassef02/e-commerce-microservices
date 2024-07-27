import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriesQuery } from '../impl/get-categories.query';
import { CategoryService } from '../../category.service';
import { CategoryQuery } from '@app/common/utils/features/category.query';
import { CategoryFilter } from '@app/common/utils/types/category/category-filter.type';
import { PaginationResponse } from '@app/common/utils/types/pagination-response.type';
import { Category } from '../../entities/category.entity';
import { map, switchMap } from 'rxjs';

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {
  constructor(private categoryService: CategoryService) {}

  async execute(
    categoriesQuery: GetCategoriesQuery,
  ): Promise<PaginationResponse> {
    const query: CategoryQuery = categoriesQuery.query;
    query.filter = this.filter(query);
    return this.paginate(query).toPromise();
  }

  private filter(query: CategoryQuery): CategoryFilter {
    const filter: CategoryFilter = {};
    if (query.parent) {
      filter.parent = query.parent;
    }
    return filter;
  }

  private paginate(query: CategoryQuery) {
    return this.categoryService.findAll(query).pipe(
      switchMap((data: Category[]) =>
        this.categoryService.countDocuments(query).pipe(
          map((count: number) => {
            const totalPages: number = Math.ceil(count / query.limit);
            const currentPage: number = query.page;
            return {
              data,
              count,
              totalPages,
              currentPage,
            };
          }),
        ),
      ),
    );
  }
}
