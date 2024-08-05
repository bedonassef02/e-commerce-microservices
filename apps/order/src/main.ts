import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_URL } from '@app/common/utils/constants/constants';
import { LoggingInterceptor } from '@app/common/intercetpors/logging.interceptor';
import { OrderModule } from './order.module';
import { ORDER_QUEUE } from '@app/common/utils/constants/queue.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: ORDER_QUEUE,
      },
    },
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen();
}
bootstrap();
