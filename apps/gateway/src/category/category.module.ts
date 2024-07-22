import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/helpers/register-client.helper';
import { CategoryMP, CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule,
    ClientsModule.register([registerClient(CategoryMP)]),
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
