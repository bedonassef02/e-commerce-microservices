import { UseCoupnDto } from '@app/common/dto/coupon/use-coupon.dto';

export class CanUseCouponQuery {
  constructor(public readonly couponDto: UseCoupnDto) {}
}
