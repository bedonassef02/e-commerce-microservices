import { RpcException } from '@nestjs/microservices';
import { Coupon } from '../../entities/coupon.entity';
import { HttpStatus } from '@nestjs/common';
import { RpcConflictException } from '@app/common/exceptions/rpc-conflict-exception';

export function checkCoupon(coupon: Coupon): Coupon {
  if (coupon) {
    if (!coupon.isActive) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Coupon is not active',
      });
    } else if (coupon.usageCount >= coupon.usageLimit) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Coupon usage limit reached',
      });
    }
    return coupon;
  }
  throw new RpcConflictException(Coupon.name);
}
