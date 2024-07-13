import { CreateCategoryDto } from '@app/common/dto/category/create-category.dto';

export class CreateCategoryCommand {
  constructor(public readonly createCategoryDto: CreateCategoryDto) {}
}
