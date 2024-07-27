import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { WishlistModule } from './wishlist/wishlist.module';

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
})
export class GatewayModule {}
