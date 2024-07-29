import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { CommonModule, ProductMP } from '@app/common';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { TokenService } from '@app/common/services/token.service';

@Module({
  imports: [
    CommonModule,
    registerJwt(),
    ClientsModule.register([registerClient(ProductMP)]),
  ],
  controllers: [ProductController],
  providers: [TokenService],
})
export class ProductModule {}
