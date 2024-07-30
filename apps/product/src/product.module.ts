import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { productQueries } from './queries';
import { productCommands } from './commands';
import { CategoryMP, CommonModule } from '@app/common';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { connectToMongo } from '@app/common/utils/modules/connect-to-mongo.helper';

@Module({
  imports: [
    CommonModule,
    connectToMongo(Product.name),
    CqrsModule,
    ClientsModule.register([registerClient(CategoryMP)]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ...productQueries, ...productCommands],
})
export class ProductModule {}
