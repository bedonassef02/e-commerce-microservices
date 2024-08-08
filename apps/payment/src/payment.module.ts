import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CommonModule, OrderMP } from '@app/common';
import { CqrsModule } from '@nestjs/cqrs';
import { paymentHandlers } from './commands';
import { StripeService } from './services/stripe.service';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';

@Module({
  imports: [
    CommonModule,
    CqrsModule,
    ClientsModule.register([registerClient(OrderMP)]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, StripeService, ...paymentHandlers],
})
export class PaymentModule {}
