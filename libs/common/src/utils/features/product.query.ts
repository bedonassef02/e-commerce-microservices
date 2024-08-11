import { Expose, Type } from 'class-transformer';
import { QueryFeature } from '@app/common/utils/features/query.feature';
import { OrderFilter } from '@app/common/utils/filters/order.filter';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../../../../../apps/order/src/utils/order-status';
import { OrderPayment } from '../../../../../apps/order/src/utils/order-payment';

export class ProductQuery extends QueryFeature {
  user: string;
  @Expose({ name: 'skip' })
  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  fields: string = 'name price images category';
  limit = 12;

  filter: OrderFilter;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_price: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_price: number;
  @IsOptional()
  @IsString()
  @IsIn(Object.values(OrderStatus))
  status: OrderStatus;
  @IsOptional()
  @IsString()
  has_coupon: boolean;
  @IsOptional()
  @IsString()
  @IsIn(Object.values(OrderPayment))
  payment: OrderPayment;
}
