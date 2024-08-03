import { CanUseCouponHandler } from './handlers/can-use-coupon.handler';
import { GetCouponHandler } from './handlers/get-coupon.handler';

export const couponQueries = [GetCouponHandler, CanUseCouponHandler];
