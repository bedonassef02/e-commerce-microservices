import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_URL } from '@app/common/utils/constants/constants';
import { LoggingInterceptor } from '@app/common/intercetpors/logging.interceptor';
import { MAIL_QUEUE } from '@app/common/utils/constants/queue.constants';
import { MailModule } from './mail.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URL],
        queue: MAIL_QUEUE,
      },
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen();
}
bootstrap();
