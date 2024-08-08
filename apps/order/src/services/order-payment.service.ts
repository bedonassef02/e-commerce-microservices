import { Inject, Injectable } from '@nestjs/common';
import { Commands } from '@app/common/utils/types/crud.interface';
import { OrderService } from '../order.service';
import {
  CART_SERVICE,
  PAYMENT_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { switchMap, map, catchError, of, from } from 'rxjs';
import { CheckoutDto } from '@app/common/dto/payment/checkout.dto';
import { CheckoutService } from './checkout.service';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';
import { Coupon } from '../../../coupon/src/entities/coupon.entity';
import { Order } from '../entities/order.entity';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@Injectable()
export class OrderPaymentService {
  constructor(
    private readonly orderService: OrderService,
    private readonly checkoutService: CheckoutService,
    @Inject(CART_SERVICE) private cartService: ClientProxy,
    @Inject(PAYMENT_SERVICE) private paymentService: ClientProxy,
  ) {}

  cashOnDeliveryOrder(orderDto: CreateOrderDto) {
    return this.getCartPrice(orderDto.user).pipe(
      switchMap((price: number) => {
        orderDto.price = price;
        return this.applyCouponIfNeeded(orderDto);
      }),
      switchMap((updatedOrderDto: CreateOrderDto) =>
        this.orderService.create(updatedOrderDto),
      ),
      throwException,
    );
  }

  onlinePaymentOrder(orderDto: CreateOrderDto) {
    return this.cashOnDeliveryOrder(orderDto).pipe(
      switchMap((order: Order) => this.processOnlinePayment(order)),
      catchError((error) => throwException(error)),
    );
  }

  private getCartPrice(user: string) {
    return this.cartService
      .send<number>(Commands.Cart.PRICE, user)
      .pipe(catchError((error) => throwException(error)));
  }

  private applyCouponIfNeeded(orderDto: CreateOrderDto) {
    if (orderDto.code) {
      return this.checkoutService.getCoupon(orderDto.user, orderDto.code).pipe(
        map((coupon: Coupon) => this.applyCoupon(orderDto, coupon)),
        throwException,
      );
    }
    return of(orderDto);
  }

  private applyCoupon(
    orderDto: CreateOrderDto,
    coupon: Coupon,
  ): CreateOrderDto {
    orderDto.coupon = coupon;
    orderDto.price -= (orderDto.price * coupon.discount) / 100;
    return orderDto;
  }

  private processOnlinePayment(order: Order) {
    const { products, id, coupon } = order;
    const checkoutDto: CheckoutDto = {
      products,
      discount: coupon ? coupon.discount : 0,
      order: id,
    };
    return this.paymentService
      .send<string>(Commands.Payment.CHECKOUT, checkoutDto)
      .pipe(
        switchMap((url: string) => {
          order.url = url;
          return from(order.save()).pipe(map(() => order));
        }),
        throwException,
      );
  }
}
