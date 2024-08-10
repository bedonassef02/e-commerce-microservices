import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { lastValueFrom, map, switchMap } from 'rxjs';
import { AddToCartCommand } from '../impl/add-to-cart.command';
import { CartService } from '../../cart.service';
import { CartDocument } from '../../entites/cart.entity';
import { Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
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
        .send(Commands.Crud.FIND_BY_ID, command.cartDto.product)
        .pipe(
          switchMap(() => {
            return this.cartService.findUserCart(command.cartDto.user).pipe(
              map((cart: CartDocument) => {
                return this.cartService.update(cart, command.cartDto);
              }),
            );
          }),
          throwException,
        ),
    );
  }
}
