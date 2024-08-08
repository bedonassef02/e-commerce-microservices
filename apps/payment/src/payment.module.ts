import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CommonModule } from '@app/common';
import { CqrsModule } from '@nestjs/cqrs';
import { paymentHandlers } from './commands';
import { StripeService } from './services/stripe.service';

@Module({
  imports: [CommonModule, CqrsModule],
  controllers: [PaymentController],
  providers: [PaymentService, StripeService, ...paymentHandlers],
})
export class PaymentModule {}
