import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CommonModule, ProductMP } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './entites/cart.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { cartHandlers } from './commands';
import { cartQueries } from './queries';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { connectToMongo } from '@app/common/utils/modules/connect-to-mongo.helper';

@Module({
  imports: [
    CommonModule,
    connectToMongo(Cart.name),
    CqrsModule,
    ClientsModule.register([registerClient(ProductMP)]),
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService, ...cartHandlers, ...cartQueries],
})
export class CartModule {}
