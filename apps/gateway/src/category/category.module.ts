import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATEGORY_SERVICE } from '@app/common/utils/constants';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: CATEGORY_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'categories-queue',
        },
      },
    ]),
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
