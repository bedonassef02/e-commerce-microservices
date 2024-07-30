import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { CommonModule, ProductMP } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wishlist, WishlistSchema } from './entities/wishlist.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { wishlistQueries } from './queries';
import { wishlistHandlers } from './commands';
import { connectToMongo } from '@app/common/utils/modules/connect-to-mongo.helper';

@Module({
  imports: [
    CommonModule,
    connectToMongo(Wishlist.name),
    CqrsModule,
    ClientsModule.register([registerClient(ProductMP)]),
    MongooseModule.forFeature([
      { name: Wishlist.name, schema: WishlistSchema },
    ]),
  ],
  controllers: [WishlistController],
  providers: [WishlistService, ...wishlistQueries, ...wishlistHandlers],
})
export class WishlistModule {}
