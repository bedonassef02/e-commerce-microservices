import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CartMP,
  CommonModule,
  CouponMP,
  PaymentMP,
  ProductMP,
} from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { orderQueries } from './queries';
import { connectToMongo } from '@app/common/utils/modules/connect-to-mongo.helper';
import { orderHandlers } from './commands';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { CheckoutService } from './services/checkout.service';
import { OrderPaymentService } from './services/order-payment.service';

@Module({
  imports: [
    CqrsModule,
    CommonModule,
    connectToMongo(Order.name),
    ClientsModule.register([
      registerClient(ProductMP),
      registerClient(CouponMP),
      registerClient(CartMP),
      registerClient(PaymentMP),
    ]),
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    CheckoutService,
    OrderPaymentService,
    ...orderQueries,
    ...orderHandlers,
  ],
})
export class OrderModule {}
