import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from '@app/common/intercetpors/timeout.interceptor';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { registerI18n } from '@app/common/utils/modules/register-i18n.helper';
import { TokenService } from '@app/common/services/token.service';
import { CustomI18nService } from './utils/services/custom-i18n.service';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [
    registerJwt(),
    registerI18n(),
    CategoryModule,
    ProductModule,
    AuthModule,
    CartModule,
    OrderModule,
    WishlistModule,
    CouponModule,
    // TODO: Brand
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    TokenService,
    CustomI18nService,
  ],
})
export class GatewayModule {}
