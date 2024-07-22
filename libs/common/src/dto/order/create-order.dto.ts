import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateOrderDto {
  user: string;
  @IsArray()
  @IsMongoId({ each: true })
  products: string[];
  totalPrice: number;
  status: string;
  @IsString()
  address: string;
}
