import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { GetCouponQuery } from '../impl/get-coupon.query';
import { Coupon } from 'apps/coupon/src/entities/coupon.entity';
import { CouponService } from 'apps/coupon/src/coupon.service';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';
import { RpcConflictException } from '@app/common/exceptions/rpc-conflict-exception';
import { checkCoupon } from '../../utils/helpers/check-coupon.helper';

@QueryHandler(GetCouponQuery)
export class GetCouponHandler implements IQueryHandler<GetCouponQuery> {
  constructor(private couponService: CouponService) {}

  async execute(query: GetCouponQuery): Promise<Observable<Coupon>> {
    return this.couponService.findOne(query.code).pipe(
      map((coupon: Coupon) => {
        return checkCoupon(coupon);
      }),
    );
  }
}
