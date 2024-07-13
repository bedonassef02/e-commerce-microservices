import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from '@app/common/utils/constants';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'products-queue',
        },
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
