import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WishlistService } from '../../wishlist.service';
import { AddToWishlistCommand } from '../impl/add-to-wishlist.command';
import { HttpStatus, Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { Commands } from '@app/common/utils/commands';
import { WishlistDocument } from '../../entities/wishlist.entity';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@CommandHandler(AddToWishlistCommand)
export class AddToWishlistHandler
  implements ICommandHandler<AddToWishlistCommand>
{
  constructor(
    private readonly wishlistService: WishlistService,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
  ) {}

  async execute(command: AddToWishlistCommand) {
    return lastValueFrom(
      this.productService
        .send(Commands.Crud.FIND_BY_ID, command.wishlistDto.product)
        .pipe(
          map(() => {
            return this.wishlistService
              .findByUserId(command.wishlistDto.user)
              .pipe(
                map((wishlist: WishlistDocument) => {
                  const isExist = wishlist.products.find(
                    (p) => p == command.wishlistDto.product,
                  );
                  if (isExist) {
                    throw new RpcException({
                      status: HttpStatus.CONFLICT,
                      message: 'Product already in wishlist',
                    });
                  }
                  wishlist.products.push(command.wishlistDto.product);
                  wishlist.save();
                  return wishlist;
                }),
              );
          }),
          throwException,
        ),
    );
  }
}
