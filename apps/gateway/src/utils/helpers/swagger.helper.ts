import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('E-Commerce')
  .setDescription('The E-Commerce API description')
  .setVersion('1.0')
  .addTag('e-commerce')
  .build();
