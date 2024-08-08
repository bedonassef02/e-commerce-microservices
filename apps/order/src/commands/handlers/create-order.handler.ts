import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { Inject } from '@nestjs/common';
import { CART_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { map, switchMap, from } from 'rxjs';
import { CartDocument } from '../../../../cart/src/entites/cart.entity';
import { throwException } from '@app/common/utils/exception/throw-excpetion';
import { OrderPayment } from '../../utils/order-payment';
import { Order } from '../../entities/order.entity';
import { CheckoutService } from '../../services/checkout.service';
import { OrderPaymentService } from '../../services/order-payment.service';
import { Product } from '../../../../product/src/entities/product.entity';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly orderPaymentService: OrderPaymentService,
    @Inject(CART_SERVICE) private cartService: ClientProxy,
  ) {}

  async execute(command: CreateOrderCommand): Promise<any> {
    const { user } = command.orderDto;

    return this.cartService
      .send<CartDocument>(Commands.Cart.FIND_BY_USER, user)
      .pipe(
        switchMap((cart: CartDocument) => {
          this.checkoutService.checkCart(cart);

          return from(this.checkoutService.getProducts(cart)).pipe(
            switchMap((products: Product[]) => {
              command.orderDto.products = products;

              let order$;
              if (command.orderDto.payment === OrderPayment.CASH_ON_DELIVERY) {
                order$ = this.orderPaymentService.cashOnDeliveryOrder(
                  command.orderDto,
                );
              } else {
                order$ = this.orderPaymentService.onlinePaymentOrder(
                  command.orderDto,
                );
              }

              return order$.pipe(
                switchMap((order: Order) =>
                  this.checkoutService.clearCart(user).pipe(map(() => order)),
                ),
              );
            }),
          );
        }),
        throwException,
      )
      .toPromise();
  }
}
