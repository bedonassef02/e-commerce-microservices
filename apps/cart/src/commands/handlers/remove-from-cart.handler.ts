import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { from, map, Observable } from 'rxjs';
import { CartService } from '../../cart.service';
import { CartDocument } from '../../entites/cart.entity';
import { RemoveFromCartCommand } from '../impl/remove-from-cart.command';
import { productIndex } from '../../utils/product-index.helper';
import { notFoundException } from '@app/common/utils/exception/not-found.exception';
import { Product } from '../../../../product/src/entities/product.entity';

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
            notFoundException(Product.name);
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
