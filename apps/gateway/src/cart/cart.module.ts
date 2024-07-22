import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/helpers/register-client.helper';
import { CartMP, CommonModule } from '@app/common';

@Module({
  imports: [CommonModule, ClientsModule.register([registerClient(CartMP)])],
  controllers: [CartController],
})
export class CartModule {}
