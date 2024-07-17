import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CategoryModule } from './category.module';
import { CATEGORY_QUEUE, RMQ_URL } from '@app/common/utils/constants';
import { LoggingInterceptor } from '@app/common/middlewares/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CategoryModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: CATEGORY_QUEUE,
      },
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen();
}
bootstrap();
