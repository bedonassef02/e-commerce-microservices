import { UseCouponDto } from '@app/common/dto/coupon/use-coupon.dto';

export class UseCouponCommand {
  constructor(public readonly couponDto: UseCouponDto) {}
}
