import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/helpers/register-client.helper';
import { CommonModule, OrderMP } from '@app/common';

@Module({
  imports: [CommonModule, ClientsModule.register([registerClient(OrderMP)])],
  controllers: [OrderController],
})
export class OrderModule {}
