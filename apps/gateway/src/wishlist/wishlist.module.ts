import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { CommonModule, WishlistMP } from '@app/common';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { TokenService } from '@app/common/services/token.service';

@Module({
  imports: [
    CommonModule,
    registerJwt(),
    ClientsModule.register([registerClient(WishlistMP)]),
  ],
  controllers: [WishlistController],
  providers: [TokenService],
})
export class WishlistModule {}
