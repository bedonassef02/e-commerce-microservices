import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/helpers/register-client.helper';
import { ProductMP } from '@app/common';

@Module({
  imports: [ClientsModule.register([registerClient(ProductMP)])],
  controllers: [ProductController],
})
export class ProductModule {}
