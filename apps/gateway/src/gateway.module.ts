import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  CATEGORY_QUEUE,
  CATEGORY_SERVICE,
  PRODUCT_QUEUE,
  PRODUCT_SERVICE,
  RMQ_URL,
} from '@app/common/utils/constants';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CATEGORY_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_URL],
          queue: CATEGORY_QUEUE,
        },
      },
      {
        name: PRODUCT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_URL],
          queue: PRODUCT_QUEUE,
        },
      },
    ]),
    CategoryModule,
    ProductModule,
  ],
})
export class GatewayModule {}
