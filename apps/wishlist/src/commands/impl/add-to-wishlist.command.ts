import { WishlistDto } from '@app/common/dto/wishlist/wishlist.dto';

export class  AddToWishlistCommand{
  constructor(public readonly wishlistDto: WishlistDto) {}
}
