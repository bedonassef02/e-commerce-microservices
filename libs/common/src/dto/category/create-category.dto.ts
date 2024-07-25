import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly name: string;
  @IsOptional()
  @IsString()
  readonly description?: string;
  @IsOptional()
  @IsMongoId()
  parent: string;
}
