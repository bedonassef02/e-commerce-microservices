import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CartMP, CommonModule } from '@app/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { Coupon } from './entities/coupon.entity';
import { couponQueries } from './queries';
import { couponHandlers } from './commands';
import { connectToMysql } from '@app/common/utils/modules/connect-to-mysql.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectToMongo } from '@app/common/utils/modules/connect-to-mongo.helper';
import {
  CouponHistory,
  CouponHistorySchema,
} from './entities/coupon-history.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CqrsModule,
    CommonModule,
    connectToMysql(Coupon.name, [Coupon]),
    connectToMongo(Coupon.name),
    TypeOrmModule.forFeature([Coupon]),
    MongooseModule.forFeature([
      { name: CouponHistory.name, schema: CouponHistorySchema },
    ]),
    ClientsModule.register([registerClient(CartMP)]),
  ],
  controllers: [CouponController],
  providers: [CouponService, ...couponQueries, ...couponHandlers],
})
export class CouponModule {}
