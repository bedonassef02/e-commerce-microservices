import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_URL } from '@app/common/utils/constants/constants';
import { LoggingInterceptor } from '@app/common/middlewares/logging.interceptor';
import { WishlistModule } from './wishlist.module';
import { WISHLIST_QUEUE } from '@app/common/utils/constants/queue.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WishlistModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: WISHLIST_QUEUE,
      },
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen();
}
bootstrap();
