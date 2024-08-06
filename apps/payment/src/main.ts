import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_URL } from '@app/common/utils/constants/constants';
import { LoggingInterceptor } from '@app/common/intercetpors/logging.interceptor';
import { PAYMENT_QUEUE } from '@app/common/utils/constants/queue.constants';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: PAYMENT_QUEUE,
      },
    },
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen();
}
bootstrap();
