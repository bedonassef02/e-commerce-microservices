import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductModule } from './product.module';
import { RMQ_URL } from '@app/common/utils/constants/constants';
import { LoggingInterceptor } from '@app/common/intercetpors/logging.interceptor';
import { PRODUCT_QUEUE } from '@app/common/utils/constants/queue.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: PRODUCT_QUEUE,
      },
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen();
}
bootstrap();
