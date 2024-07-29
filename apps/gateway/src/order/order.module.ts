import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { CommonModule, OrderMP } from '@app/common';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { TokenService } from '@app/common/services/token.service';

@Module({
  imports: [
    CommonModule,
    registerJwt(),
    ClientsModule.register([registerClient(OrderMP)]),
  ],
  controllers: [OrderController],
  providers: [TokenService],
})
export class OrderModule {}
