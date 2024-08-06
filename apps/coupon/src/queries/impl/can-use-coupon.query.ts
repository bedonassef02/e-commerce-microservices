import { UseCouponDto } from '@app/common/dto/coupon/use-coupon.dto';

export class CanUseCouponQuery {
  constructor(public readonly couponDto: UseCouponDto) {}
}
