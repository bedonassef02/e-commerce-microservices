import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { CategoryMP, CommonModule } from '@app/common';
import { TokenService } from '@app/common/services/token.service';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';

@Module({
  imports: [
    CommonModule,
    registerJwt(),
    ClientsModule.register([registerClient(CategoryMP)]),
  ],
  controllers: [CategoryController],
  providers: [TokenService],
})
export class CategoryModule {}
