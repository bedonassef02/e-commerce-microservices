import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from '@app/common/dto/order/address.dto';

export class CreateOrderDto {
  user: string;
  @IsArray()
  @IsMongoId({ each: true })
  products: string[];
  price?: number;
  status: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
  @IsOptional()
  @IsString()
  code: string;
  @IsString()
  payment: string;
}
