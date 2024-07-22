import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsNumber()
  @IsPositive()
  stock: number;
  @IsArray()
  @IsString({ each: true })
  @IsArray()
  images: string[];
  @IsMongoId()
  category: string;
}
