import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from '@app/common/dto/order/address.dto';
import { OrderPayment } from '../../../../../apps/order/src/utils/order-payment';
import { Product } from '../../../../../apps/product/src/entities/product.entity';
import { Coupon } from '../../../../../apps/coupon/src/entities/coupon.entity';
import { OrderStatus } from '../../../../../apps/order/src/utils/order-status';

export class CreateOrderDto {
  user: string;
  products: Product[];
  price?: number;
  status: OrderStatus;
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
  @IsOptional()
  @IsString()
  code: string;
  @IsString()
  @IsIn(Object.values(OrderPayment))
  payment: OrderPayment;
  url?: string;
  coupon?: Coupon;
}
