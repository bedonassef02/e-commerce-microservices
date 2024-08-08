import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Commands } from '@app/common/utils/types/crud.interface';
import { throwException } from '@app/common/utils/exception/throw-excpetion';
import {
  CART_SERVICE,
  COUPON_SERVICE,
  PRODUCT_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { CartProduct } from '../../../cart/src/utils/product-cart';
import { map, forkJoin } from 'rxjs';
import { UseCouponDto } from '@app/common/dto/coupon/use-coupon.dto';
import { Coupon } from '../../../coupon/src/entities/coupon.entity';
import { CartDocument } from '../../../cart/src/entites/cart.entity';
import { Product } from '../../../product/src/entities/product.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @Inject(CART_SERVICE) private cartService: ClientProxy,
    @Inject(COUPON_SERVICE) private couponService: ClientProxy,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
  ) {}

  getCoupon(user: string, code: string) {
    const couponDto: UseCouponDto = { user, code };
    return this.couponService
      .send<Coupon>(Commands.Coupon.CAN_USE, couponDto)
      .pipe(throwException);
  }

  checkCart(cart: CartDocument) {
    if (!cart.products || cart.products.length === 0) {
      throw new BadRequestException('Your cart is empty');
    }
  }

  clearCart(user: string) {
    return this.cartService
      .send<void>(Commands.Cart.CLEAR, user)
      .pipe(throwException);
  }

  getProducts(cart: CartDocument) {
    this.checkCart(cart);
    const productObservables = cart.products.map((item: CartProduct) => {
      return this.productService
        .send<Product>(Commands.FIND_BY_ID, item.product)
        .pipe(
          map((product: Product) => {
            product.stock = item.quantity;
            return product;
          }),
          throwException,
        );
    });
    return forkJoin(productObservables);
  }
}
