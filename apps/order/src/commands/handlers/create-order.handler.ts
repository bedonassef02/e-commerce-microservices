import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderService } from '../../order.service';
import { PaymentService } from '../../../../payment/src/payment.service';
import { Inject } from '@nestjs/common';
import {
  CART_SERVICE,
  COUPON_SERVICE,
  PRODUCT_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderService: OrderService,
    @Inject(PaymentService) private paymentService: ClientProxy,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
    @Inject(CART_SERVICE) private cartService: ClientProxy,
    @Inject(COUPON_SERVICE) private couponService: ClientProxy,
  ) {}

  async execute(command: CreateOrderCommand) {}
}
