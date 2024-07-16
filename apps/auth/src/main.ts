import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_QUEUE, RMQ_URL } from '@app/common/utils/constants';
import { AuthModule } from './auth.module';
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
  app.listen();
}
bootstrap();
