import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Category } from '../../entities/category.entity';
import { from, map, Observable } from 'rxjs';
import { GetCategoryQuery } from '../impl/get-category.query';
import { CategoryService } from '../../category.service';
import { RpcNotFoundException } from '@app/common/exceptions/rpc-not-found-exception';
import { CustomI18nService } from '@app/common/services/custom-i18n.service';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly i18nService: CustomI18nService,
  ) {}

  async execute(query: GetCategoryQuery): Promise<Observable<Category>> {
    return from(this.categoryService.findById(query.id)).pipe(
      map((category: Category) => {
        if (category) {
          return category;
        }
        const message: string = this.getErrorMessage(query.id);
        throw new RpcNotFoundException(message);
      }),
    );
  }

  getErrorMessage(id: string): string{
    return this.i18nService.translate('main.NOT_FOUND', { id });
  }
}
