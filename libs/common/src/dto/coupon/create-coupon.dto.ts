import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  code: string;
  @IsInt()
  @Min(1)
  discount: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  minPurchaseAmount: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  usageLimitPerCustomer: number;
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
  @IsDateString()
  expirationDate: Date;
}
