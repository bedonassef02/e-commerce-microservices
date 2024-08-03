import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { from, lastValueFrom, map, Observable, of } from 'rxjs';
import { GetCouponQuery } from '../impl/get-coupon.query';
import { Coupon } from 'apps/coupon/src/entities/coupon.entity';
import { CouponService } from 'apps/coupon/src/coupon.service';
import { CanUseCouponQuery } from '../impl/can-use-coupon.query';
import { checkCoupon } from '../../utils/helpers/check-coupon.helper';
import { Commands } from '@app/common/utils/types/crud.interface';
import { ClientProxy } from '@nestjs/microservices';
import { CART_SERVICE } from '@app/common/utils/constants/service.constants';
import { Inject } from '@nestjs/common';
import { Cart } from 'apps/cart/src/entites/cart.entity';

@QueryHandler(CanUseCouponQuery)
export class CanUseCouponHandler implements IQueryHandler<CanUseCouponQuery> {
  constructor(
    private readonly couponService: CouponService,
    @Inject(CART_SERVICE) private readonly cartService: ClientProxy,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: CanUseCouponQuery) {
    const cart$ = this.cartService.send<Cart, string>(
      Commands.Cart.FIND_BY_USER,
      query.couponDto.user,
    );

    const coupon = await lastValueFrom(
      this.couponService.findOne(query.couponDto.code),
    );

    const cart: Cart = await lastValueFrom(cart$);

    if (checkCoupon(coupon)) {
      if (cart) {
        return coupon;
        console.log({ cart });
      }
      return cart;
    }

    throw new Error('Coupon cannot be used');
  }
}
