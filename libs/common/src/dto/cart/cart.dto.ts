import { IsMongoId, IsOptional, IsPositive } from 'class-validator';

export class CartDto {
  user: string;
  @IsMongoId()
  product?: string;
  @IsOptional()
  @IsPositive()
  quantity?: number = 1;
}
