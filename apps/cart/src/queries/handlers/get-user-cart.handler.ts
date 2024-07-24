import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserCartQuery } from '../impl/get-user-cart.query';
import { CartService } from '../../cart.service';
import { map, Observable } from 'rxjs';
import { Cart } from '../../entites/cart.entity';

@QueryHandler(GetUserCartQuery)
export class GetUserCartHandler implements IQueryHandler<GetUserCartQuery> {
  constructor(private cartService: CartService) {}

  async execute(query: GetUserCartQuery): Promise<Observable<Cart>> {
    return this.cartService.findUserCart(query.user);
  }
}
