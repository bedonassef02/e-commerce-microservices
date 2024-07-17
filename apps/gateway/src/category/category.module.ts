import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/helpers/register-client.helper';
import { CategoryMP } from '@app/common';

@Module({
  imports: [CqrsModule, ClientsModule.register([registerClient(CategoryMP)])],
  controllers: [CategoryController],
})
export class CategoryModule {}
