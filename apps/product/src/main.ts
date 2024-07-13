import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductModule } from './product.module';
import { PRODUCT_QUEUE, RMQ_URL } from '@app/common/utils/constants';

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
  app.listen();
}
bootstrap();
