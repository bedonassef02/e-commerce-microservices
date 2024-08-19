import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from '@app/common/intercetpors/timeout.interceptor';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { registerI18n } from '@app/common/utils/modules/register-i18n.helper';
import { TokenService } from '@app/common/services/token.service';
import { CustomI18nService } from './utils/services/custom-i18n.service';
import { CouponModule } from './coupon/coupon.module';
import { ReviewModule } from './review/review.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    registerJwt(),
    registerI18n(),
    CategoryModule,
    ProductModule,
    AuthModule,
    CartModule,
    OrderModule,
    WishlistModule,
    CouponModule,
    ReviewModule,
    PaymentModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'uploads'),
      serveRoot: '/static',
    }),
    DevtoolsModule.register({
      http: true,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    TokenService,
    CustomI18nService,
  ],
})
export class GatewayModule {}
