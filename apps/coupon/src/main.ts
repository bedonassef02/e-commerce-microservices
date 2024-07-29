import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_URL } from '@app/common/utils/constants/constants';
import { LoggingInterceptor } from '@app/common/intercetpors/logging.interceptor';
import { COUPON_QUEUE } from '@app/common/utils/constants/queue.constants';
import { CouponModule } from './coupon.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CouponModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: COUPON_QUEUE,
      },
    },
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen();
}
bootstrap();
