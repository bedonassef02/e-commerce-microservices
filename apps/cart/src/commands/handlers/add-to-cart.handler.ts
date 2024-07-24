import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { from, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { AddToCartCommand } from '../impl/add-to-cart.command';
import { CartService } from '../../cart.service';
import { CartDocument } from '../../entites/cart.entity';
import { HttpStatus, Inject } from '@nestjs/common';
import {
  CATEGORY_SERVICE,
  PRODUCT_QUEUE,
  PRODUCT_SERVICE,
} from '@app/common/utils/constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { Product } from '../../../../product/src/entities/product.entity';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@CommandHandler(AddToCartCommand)
export class AddToCartHandler implements ICommandHandler<AddToCartCommand> {
  constructor(
    private readonly cartService: CartService,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
  ) {}

  async execute(command: AddToCartCommand): Promise<any> {
    return lastValueFrom(
      this.productService
        .send(Commands.FIND_BY_ID, command.cartDto.product)
        .pipe(
          switchMap(() => {
            return this.cartService.findUserCart(command.cartDto.user).pipe(
              map((cart: CartDocument) => {
                if (!cart) {
                  return this.cartService.create(command.cartDto);
                }
                return this.cartService.update(cart, command.cartDto);
              }),
            );
          }),
          throwException,
        ),
    );
  }
}
