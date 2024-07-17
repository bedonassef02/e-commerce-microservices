import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/helpers/register-client.helper';
import { ProductMP } from '@app/common';

@Module({
  imports: [CqrsModule, ClientsModule.register([registerClient(ProductMP)])],
  controllers: [ProductController],
})
export class ProductModule {}
