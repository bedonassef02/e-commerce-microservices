import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ORDER_QUEUE, RMQ_URL } from '@app/common/utils/constants/constants';
import { LoggingInterceptor } from '@app/common/middlewares/logging.interceptor';
import { OrderModule } from './order.module';

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
