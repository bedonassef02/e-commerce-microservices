import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { GetWishlistQuery } from '../impl/get-wishlist.query';
import { WishlistService } from '../../wishlist.service';
import { Wishlist } from '../../entities/wishlist.entity';

@QueryHandler(GetWishlistQuery)
export class GetWishlistHandler implements IQueryHandler<GetWishlistQuery> {
  constructor(private wishlistService: WishlistService) {}

  async execute(query: GetWishlistQuery): Promise<Observable<Wishlist>> {
    return this.wishlistService.findByUserId(query.user);
  }
}
