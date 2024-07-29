import { CreateCouponDto } from '@app/common/dto/coupon/create-coupon.dto';

export class CreateCouponCommand {
  constructor(public readonly couponDto: CreateCouponDto) {}
}
