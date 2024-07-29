import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { orderQueries } from './queries';
import { connectToMongo } from '@app/common/utils/modules/connect-to-mongo.helper';

@Module({
  imports: [
    CqrsModule,
    CommonModule,
    connectToMongo(Order.name),
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, ...orderQueries],
})
export class OrderModule {}
