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

@CommandHandler(AddToWishlistCommand)
export class AddToWishlistHandler implements ICommandHandler<AddToWishlistCommand> {
  constructor(private readonly wishlistService: WishlistService,
  @Inject(PRODUCT_SERVICE) private productService: ClientProxy) {}

  async execute(command: AddToWishlistCommand) {
    return lastValueFrom(
      this.productService
        .send(Commands.FIND_BY_ID, command.wishlistDto.product)
        .pipe(
          switchMap(() => {
            return this.wishlistService.findByUserId(command.wishlistDto.user).pipe(
              map((wishlist: WishlistDocument) => {
                const isExist = wishlist.products.find((p)=> p == command.wishlistDto.product)
                if(isExist){
                  return wishlist;
                }
                return this.wishlistService.update(wishlist, command.wishlistDto.product)
              }),
            );
          }),
          throwException,
        ),
    );
  }
}
