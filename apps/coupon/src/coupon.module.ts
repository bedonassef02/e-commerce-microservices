import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CommonModule, CouponMP } from '@app/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { Coupon } from './entities/coupon.entity';
import { couponQueries } from './queries';
import { couponHandlers } from './commands';
import { connectToMysql } from '@app/common/utils/modules/connect-to-mysql.helper';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CqrsModule,
    CommonModule,
    connectToMysql(Coupon.name, [Coupon]),
    TypeOrmModule.forFeature([Coupon]),
    ClientsModule.register([registerClient(CouponMP)]),
  ],
  controllers: [CouponController],
  providers: [CouponService, ...couponQueries, ...couponHandlers],
})
export class CouponModule {}
