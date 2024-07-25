import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCartQuery } from '../impl/get-cart.query';
import { CartService } from '../../cart.service';
import { Observable } from 'rxjs';
import { Cart } from '../../entites/cart.entity';

@QueryHandler(GetCartQuery)
export class GetCartHandler implements IQueryHandler<GetCartQuery> {
  constructor(private cartService: CartService) {}

  async execute(query: GetCartQuery): Promise<Observable<Cart>> {
    return this.cartService.findUserCart(query.user);
  }
}
