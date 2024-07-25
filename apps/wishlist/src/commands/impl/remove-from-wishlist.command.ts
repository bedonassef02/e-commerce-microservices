
import { WishlistDto } from '@app/common/dto/wishlist/wishlist.dto';

export class  RemoveFromWishlistCommand{
  constructor(public readonly wishlistDto: WishlistDto) {}
}
