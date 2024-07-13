import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { productQueries } from './queries';
import { productCommands } from './commands';
import { CommonModule } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  CATEGORY_QUEUE,
  CATEGORY_SERVICE,
  RMQ_URL,
} from '@app/common/utils/constants';

@Module({
  imports: [
    CommonModule,
    CqrsModule,
    ClientsModule.register([
      {
        name: CATEGORY_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_URL],
          queue: CATEGORY_QUEUE,
        },
      },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ...productQueries, ...productCommands],
})
export class ProductModule {}
