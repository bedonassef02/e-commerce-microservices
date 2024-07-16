import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_URL, USER_QUEUE } from '@app/common/utils/constants';
import { UserModule } from './user.module';

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
  app.listen();
}
bootstrap();
