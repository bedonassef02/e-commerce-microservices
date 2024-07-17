import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from '@app/common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.use(new LoggerMiddleware().use);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(3000);
}
bootstrap();
