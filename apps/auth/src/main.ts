import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_QUEUE, RMQ_URL } from '@app/common/utils/constants';
import { AuthModule } from './auth.module';
import { LoggingInterceptor } from '@app/common/middlewares/logging.interceptor';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: AUTH_QUEUE,
      },
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen();
}
bootstrap();
