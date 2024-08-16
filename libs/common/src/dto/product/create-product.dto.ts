import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  stock: number;
  @IsMongoId()
  category: string;
  @IsOptional()
  cover?: string;
  @IsOptional()
  images?: string[];
}
