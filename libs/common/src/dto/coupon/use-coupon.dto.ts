import { IsMongoId, IsString } from 'class-validator';

export class UseCouponDto {
  @IsString()
  code: string;
  @IsMongoId()
  user: string;
}
