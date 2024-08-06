import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CartMP, CommonModule, CouponMP, ProductMP } from '@app/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { paymentHandlers } from './commands';
import { StripeService } from './services/stripe.service';

@Module({
  imports: [
    CommonModule,
    CqrsModule,
    ClientsModule.register([
      registerClient(ProductMP),
      registerClient(CouponMP),
      registerClient(CartMP),
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, StripeService, ...paymentHandlers],
})
export class PaymentModule {}
