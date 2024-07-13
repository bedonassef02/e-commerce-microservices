import { IsMongoId } from 'class-validator';

export class CreateProductDto {
  @IsMongoId()
  category: string;
}
