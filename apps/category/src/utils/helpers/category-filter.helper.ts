import { CategoryQuery } from '@app/common/utils/features/category.query';
import { CategoryFilter } from '@app/common/utils/filters/category.filter';

export function categoryFilter(query: CategoryQuery): CategoryFilter {
  const filter: CategoryFilter = {};
  if (query.parent) {
    filter.parent = query.parent;
  }
  if (query.search) {
    filter.$or = query.searchQuery;
  }
  return filter;
}
