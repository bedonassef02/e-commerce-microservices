import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WishlistService } from '../../wishlist.service';
import { AddToWishlistCommand } from '../impl/add-to-wishlist.command';
import { Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map, switchMap } from 'rxjs';
import { Commands } from '@app/common/utils/types/crud.interface';
import { throwException } from '@app/common/utils/exception/throw-excpetion';
import { WishlistDocument } from '../../entities/wishlist.entity';
import { RemoveFromWishlistCommand } from '../impl/remove-from-wishlist.command';
import { notFoundException } from '@app/common/utils/exception/not-found.exception';
import { Product } from '../../../../product/src/entities/product.entity';

@CommandHandler(RemoveFromWishlistCommand)
export class RemoveFromWishlistHandler
  implements ICommandHandler<RemoveFromWishlistCommand>
{
  constructor(
    private readonly wishlistService: WishlistService,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
  ) {}

  async execute(command: RemoveFromWishlistCommand) {
    return this.wishlistService.findByUserId(command.wishlistDto.user).pipe(
      map((wishlist: WishlistDocument) => {
        const index = wishlist.products.findIndex(
          (p) => p == command.wishlistDto.product,
        );
        if (index === -1) {
          notFoundException(Product.name);
        }
        wishlist.products.splice(index, 1);
        wishlist.save();
        return wishlist;
      }),
    );
  }
}
