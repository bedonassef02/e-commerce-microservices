import { CategoryQuery } from '@app/common/utils/features/category.query';

export class GetCategoriesQuery {
  constructor(public readonly query: CategoryQuery) {}
}
