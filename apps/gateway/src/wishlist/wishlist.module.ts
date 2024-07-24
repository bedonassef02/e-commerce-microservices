import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { CommonModule, WishlistMP } from '@app/common';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/helpers/register-client.helper';

@Module({
  imports: [CommonModule, ClientsModule.register([registerClient(WishlistMP)])],
  controllers: [WishlistController],
})
export class WishlistModule {}
