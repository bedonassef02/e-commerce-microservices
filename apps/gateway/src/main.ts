import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { LoggerMiddleware } from '@app/common/middlewares/logger.middleware';
import helmet from 'helmet';
import * as compression from 'compression';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './utils/helpers/swagger.helper';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, { snapshot: true });

  app.use(new LoggerMiddleware().use);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.use(compression());
  app.use(helmet());
  app.enableCors();

  app.setGlobalPrefix('api');

  app.enableVersioning({ type: VersioningType.URI });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
