import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { lastValueFrom } from 'rxjs';
import { CouponService } from 'apps/coupon/src/coupon.service';
import { CanUseCouponQuery } from '../impl/can-use-coupon.query';
import { Commands } from '@app/common/utils/commands';
import { ClientProxy } from '@nestjs/microservices';
import { CART_SERVICE } from '@app/common/utils/constants/service.constants';
import { Inject } from '@nestjs/common';
import { RpcBadRequestException } from '@app/common/exceptions/rpc-bad-request-exception';

@QueryHandler(CanUseCouponQuery)
export class CanUseCouponHandler implements IQueryHandler<CanUseCouponQuery> {
  constructor(
    private readonly couponService: CouponService,
    @Inject(CART_SERVICE) private readonly cartService: ClientProxy,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: CanUseCouponQuery) {
    const cartPrice$ = this.cartService.send(
      Commands.Cart.PRICE,
      query.couponDto.user,
    );

    const coupon = await lastValueFrom(
      this.couponService.findOne(query.couponDto.code),
    );

    const price: number = await lastValueFrom(cartPrice$);

    if (coupon.minPurchaseAmount > price) {
      throw new RpcBadRequestException(
        `Minimum purchase amount of ${coupon.minPurchaseAmount} required to use this coupon`,
      );
    }
    return coupon;
  }
}
