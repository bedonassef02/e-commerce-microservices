import { UpdateCategoryDto } from '@app/common/dto/category/update-category.dto';

export class UpdateCategoryCommand {
  constructor(
    public readonly id: string,
    public readonly updateCategoryDto: UpdateCategoryDto,
  ) {}
}
