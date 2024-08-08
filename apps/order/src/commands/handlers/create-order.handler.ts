import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { Inject } from '@nestjs/common';
import { CART_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { switchMap, from, map } from 'rxjs';
import { OrderPayment } from '../../utils/order-payment';
import { Order } from '../../entities/order.entity';
import { CheckoutService } from '../../services/checkout.service';
import { OrderPaymentService } from '../../services/order-payment.service';
import { Product } from '../../../../product/src/entities/product.entity';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';
import { CartDocument } from '../../../../cart/src/entites/cart.entity';
import { throwException } from '@app/common/utils/exception/throw-excpetion';
import { InjectQueue } from '@nestjs/bullmq';
import { ORDER_QUEUE } from '@app/common/utils/constants/queue.constants';
import { Queue } from 'bullmq';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly orderPaymentService: OrderPaymentService,
    @Inject(CART_SERVICE) private readonly cartService: ClientProxy,
    @InjectQueue(ORDER_QUEUE) private readonly orderQueue: Queue,
  ) {}

  async execute(command: CreateOrderCommand): Promise<any> {
    const { user } = command.orderDto;

    return this.cartService
      .send<CartDocument>(Commands.Cart.FIND_BY_USER, user)
      .pipe(
        switchMap((cart: CartDocument) =>
          this.handleCart(cart, command.orderDto),
        ),
        throwException,
      )
      .toPromise();
  }

  private handleCart(cart: CartDocument, orderDto: CreateOrderDto) {
    this.checkoutService.checkCart(cart);

    return from(this.checkoutService.getProducts(cart)).pipe(
      switchMap((products: Product[]) => {
        orderDto.products = products;
        return this.processOrder(orderDto);
      }),
      switchMap((order: Order) => {
        return from(this.enqueueOrder(order)).pipe(map(() => order));
      }),
      throwException,
    );
  }

  private processOrder(orderDto: CreateOrderDto) {
    return orderDto.payment === OrderPayment.CASH_ON_DELIVERY
      ? this.orderPaymentService.cashOnDeliveryOrder(orderDto)
      : this.orderPaymentService.onlinePaymentOrder(orderDto);
  }

  private enqueueOrder(order: Order) {
    return this.orderQueue.add('order', order);
  }
}
