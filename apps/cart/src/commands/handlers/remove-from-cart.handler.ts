import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { from, map, Observable } from 'rxjs';
import { CartService } from '../../cart.service';
import { CartDocument } from '../../entites/cart.entity';
import { RemoveFromCartCommand } from '../impl/remove-from-cart.command';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';
import { productIndex } from '../../utils/product-index.helper';

@CommandHandler(RemoveFromCartCommand)
export class RemoveFromCartHandler
  implements ICommandHandler<RemoveFromCartCommand>
{
  constructor(private readonly cartService: CartService) {}

  async execute(
    command: RemoveFromCartCommand,
  ): Promise<Observable<CartDocument>> {
    return from(this.cartService.findUserCart(command.cartDto.user)).pipe(
      map((cart: CartDocument) => {
        if (cart) {
          const index: number = productIndex(cart, command.cartDto.product);
          if (index === -1) {
            throw new RpcException({
              status: HttpStatus.NOT_FOUND,
              message: 'product not found',
            });
          }
          cart.products.splice(index, 1);
          cart.save();
          return cart;
        }
        return cart;
      }),
    );
  }
}
