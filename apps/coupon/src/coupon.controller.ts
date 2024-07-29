import { Controller, Get } from '@nestjs/common';
import { CouponService } from './coupon.service';

@Controller()
export class CouponController {
  constructor(private readonly couponService: CouponService) {}
}
