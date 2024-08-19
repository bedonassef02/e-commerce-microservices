import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { CategoryDtoSwagger } from '../../../../../apps/gateway/src/utils/swagger/category/category-dto.swagger';

export class CreateCategoryDto {
  @IsString()
  @CategoryDtoSwagger.Name()
  readonly name: string;
  @IsOptional()
  @IsString()
  @CategoryDtoSwagger.description()
  readonly description?: string;
  @IsOptional()
  @IsMongoId()
  @CategoryDtoSwagger.parent()
  parent: string;
  @IsOptional()
  @CategoryDtoSwagger.cover()
  cover?: string;
}
