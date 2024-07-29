import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CommonModule, CouponMP } from '@app/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/helpers/register-client.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from './entities/coupon.entity';
import { couponQueries } from './queries';

@Module({
  imports: [
    CommonModule,
    CqrsModule,
    ClientsModule.register([registerClient(CouponMP)]),
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
  ],
  controllers: [CouponController],
  providers: [CouponService, ...couponQueries],
})
export class CouponModule {}
