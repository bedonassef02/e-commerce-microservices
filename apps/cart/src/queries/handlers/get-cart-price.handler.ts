import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CartService } from '../../cart.service';
import { map, mergeMap, reduce } from 'rxjs/operators';
import { Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { GetCartPriceQuery } from '../impl/get-cart-price.query';
import { from, lastValueFrom } from 'rxjs';
import { Product } from '../../../../product/src/entities/product.entity';
import { Cart } from '../../entites/cart.entity';

@QueryHandler(GetCartPriceQuery)
export class GetCartPriceHandler implements IQueryHandler<GetCartPriceQuery> {
  constructor(
    private cartService: CartService,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
  ) {}

  async execute(query: GetCartPriceQuery): Promise<number> {
    const cart$ = this.cartService.findUserCart(query.user).pipe(
      mergeMap((cart: Cart) =>
        from(cart.products).pipe(
          mergeMap((p) =>
            this.productService
              .send<Product, string>(Commands.Crud.FIND_BY_ID, p.product)
              .pipe(map((product) => p.quantity * product.price)),
          ),
          reduce((acc, price) => acc + price, 0),
        ),
      ),
    );

    return await lastValueFrom(cart$);
  }
}
