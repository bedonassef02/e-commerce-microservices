import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Category } from '../../entities/category.entity';
import { GetCategoriesQuery } from '../impl/get-categories.query';
import { Observable } from 'rxjs';
import { CategoryService } from '../../category.service';

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {
  constructor(private categoryService: CategoryService) {}

  async execute(query: GetCategoriesQuery): Promise<Observable<Category[]>> {
    return this.categoryService.findAll();
  }
}
