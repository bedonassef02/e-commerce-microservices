import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  code: string;
  @IsInt()
  @Min(1)
  @Max(85)
  discount: number;
  @IsNumber()
  @Min(100)
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
