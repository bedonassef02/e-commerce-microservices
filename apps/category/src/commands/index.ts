import { CreateCategoryHandler } from './handlers/create-category.handler';
import { UpdateCategoryHandler } from './handlers/update-category.handler';
import { RemoveCategoryHandler } from './handlers/remove-category.handler';

export const categoryCommands = [
  CreateCategoryHandler,
  UpdateCategoryHandler,
  RemoveCategoryHandler,
];
