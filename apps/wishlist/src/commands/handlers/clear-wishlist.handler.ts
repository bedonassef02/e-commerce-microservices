import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { from, map } from 'rxjs';
import { CreateWishlistCommand } from '../impl/create-wishlist.command';
import { WishlistService } from '../../wishlist.service';
import { ClearWishlistCommand } from '../impl/clear-wishlist.command';
import { WishlistDocument } from '../../entities/wishlist.entity';

@CommandHandler(ClearWishlistCommand)
export class ClearWishlistHandler
  implements ICommandHandler<ClearWishlistCommand>
{
  constructor(private readonly wishlistService: WishlistService) {}

  async execute(command: ClearWishlistCommand) {
    return from(this.wishlistService.findByUserId(command.user)).pipe(
      map((wishlist: WishlistDocument) => {
        wishlist.products = [];
        wishlist.save();
        return wishlist;
      }),
    );
  }
}
