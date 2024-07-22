import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CART_QUEUE, RMQ_URL } from '@app/common/utils/constants';
import { LoggingInterceptor } from '@app/common/middlewares/logging.interceptor';
import { CartModule } from './cart.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CartModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: CART_QUEUE,
      },
    },
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen();
}
bootstrap();
