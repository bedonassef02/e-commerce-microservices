import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCartQuery } from '../impl/get-cart.query';
import { CartService } from '../../cart.service';
import { from, Observable } from 'rxjs';
import { Cart } from '../../entites/cart.entity';
import { GetCartPriceQuery } from '../impl/get-cart-price.query';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from '@app/common/utils/constants/service.constants';
import { Inject } from '@nestjs/common';
import { Commands } from '@app/common/utils/types/crud.interface';
import { Product } from 'apps/product/src/entities/product.entity';
import { map, mergeMap, catchError, toArray } from 'rxjs/operators';

@QueryHandler(GetCartPriceQuery)
export class GetCartPriceHandler implements IQueryHandler<GetCartPriceQuery> {
  constructor(
    private cartService: CartService,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
  ) {}

  async execute(query: GetCartPriceQuery): Promise<Observable<Cart>> {
    return this.cartService.findUserCart(query.user).pipe(
      mergeMap((cart: Cart) => {
        return from(cart.products).pipe(
          mergeMap(async (p) => {
            try {
              const product: Product = await this.productService
                .send(Commands.FIND_BY_ID, p.product)
                .toPromise();
              return product.price * p.quantity;
            } catch (error) {
              console.error(`Failed to fetch product ${p.product}:`, error);
              return 0; // or handle error as needed
            }
          }),
          toArray(),
          map((prices: number[]) => {
            const totalPrice = prices.reduce((acc, price) => acc + price, 0);
            return {
              ...cart,
              totalPrice,
            };
          }),
          catchError((error) => {
            console.error('Error processing cart prices:', error);
            throw error; // or handle error as needed
          }),
        );
      }),
    );
  }
}
