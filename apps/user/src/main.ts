import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_URL, USER_QUEUE } from '@app/common/utils/constants/constants';
import { UserModule } from './user.module';
import { LoggingInterceptor } from '@app/common/middlewares/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: USER_QUEUE,
      },
    },
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen();
}
bootstrap();
