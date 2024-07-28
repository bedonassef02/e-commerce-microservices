import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from '@app/common/intercetpors/timeout.interceptor';

@Module({
  imports: [
    CategoryModule,
    ProductModule,
    AuthModule,
    CartModule,
    OrderModule,
    WishlistModule,
    // TODO: Brand
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class GatewayModule {}
