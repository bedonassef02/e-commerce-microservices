import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CommonModule, OrderMP } from '@app/common';
import { CqrsModule } from '@nestjs/cqrs';
import { paymentHandlers } from './commands';
import { StripeService } from './services/stripe.service';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { configValidation } from '@app/common/utils/helpers/config-validation.helper';
import { paymentValidation } from '@app/common/utils/validation/services/payment.validation';

@Module({
  imports: [
    CommonModule.register(configValidation(paymentValidation)),
    CqrsModule,
    ClientsModule.register([registerClient(OrderMP)]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, StripeService, ...paymentHandlers],
})
export class PaymentModule {}
