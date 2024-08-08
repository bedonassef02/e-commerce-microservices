import { Inject, Injectable } from '@nestjs/common';
import { Commands } from '@app/common/utils/types/crud.interface';
import { throwException } from '@app/common/utils/exception/throw-excpetion';
import { OrderService } from '../order.service';
import {
  CART_SERVICE,
  PAYMENT_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderCommand } from '../commands/impl/create-order.command';
import { switchMap } from 'rxjs';
import { CheckoutDto } from '@app/common/dto/payment/checkout.dto';
import { CheckoutService } from './checkout.service';
import { Product } from '../../../product/src/entities/product.entity';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';

@Injectable()
export class OrderPaymentService {
  constructor(
    private readonly orderService: OrderService,
    private readonly checkoutService: CheckoutService,
    @Inject(CART_SERVICE) private cartService: ClientProxy,
    @Inject(PAYMENT_SERVICE) private paymentService: ClientProxy,
  ) {}

  cashOnDeliveryOrder(orderDto: CreateOrderDto) {
    return this.cartService
      .send<number>(Commands.Cart.PRICE, orderDto.user)
      .pipe(
        switchMap((price: number) => {
          orderDto.price = price;
          return this.orderService.create(orderDto);
        }),
        throwException,
      );
  }

  onlinePaymentOrder(orderDto: CreateOrderDto) {
    const { user, products, code } = orderDto;
    return this.checkoutService.createDto(orderDto).pipe(
      switchMap((checkoutDto: CheckoutDto) => {
        return this.paymentService
          .send(Commands.Payment.CHECKOUT, checkoutDto)
          .pipe(
            switchMap((url: string) => {
              return this.cartService
                .send<number>(Commands.Cart.PRICE, user)
                .pipe(
                  switchMap((price: number) => {
                    orderDto.price = price;
                    orderDto.url = url;
                    return this.orderService.create(orderDto);
                  }),
                );
            }),
          );
      }),
      throwException,
    );
  }
}
