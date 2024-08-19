import { Expose, Type } from 'class-transformer';
import { QueryFeature } from '@app/common/utils/features/query.feature';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { ProductFilter } from '@app/common/utils/filters/product.filter';

export class ProductQuery extends QueryFeature {
  user: string;
  @Expose({ name: 'skip' })
  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  fields: string = 'name price images category';
  limit = 12;

  filter: ProductFilter;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_price: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_price: number;
  @IsOptional()
  @IsMongoId()
  category: string;
}
