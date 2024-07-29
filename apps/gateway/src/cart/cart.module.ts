import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { CartMP, CommonModule } from '@app/common';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { TokenService } from '@app/common/services/token.service';

@Module({
  imports: [
    CommonModule,
    registerJwt(),
    ClientsModule.register([registerClient(CartMP)]),
  ],
  controllers: [CartController],
  providers: [TokenService],
})
export class CartModule {}
