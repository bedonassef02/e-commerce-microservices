import { Category } from '../../../../../apps/category/src/entities/category.entity';

export type PaginationResponse = {
  data: Category[];
  count: number;
  totalPages: number;
  currentPage: number;
};
