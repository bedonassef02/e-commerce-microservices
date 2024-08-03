import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CommonModule, CouponMP } from '@app/common';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { TokenService } from '@app/common/services/token.service';

@Module({
  imports: [
    CommonModule,
    registerJwt(),
    ClientsModule.register([registerClient(CouponMP)]),
  ],
  controllers: [CouponController],
  providers: [TokenService],
})
export class CouponModule {}
