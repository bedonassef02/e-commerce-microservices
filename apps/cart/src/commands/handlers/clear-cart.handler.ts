import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { from, map, Observable } from 'rxjs';
import { CartService } from '../../cart.service';
import { CartDocument } from '../../entites/cart.entity';
import { ClearCartCommand } from '../impl/clear-cart.command';

@CommandHandler(ClearCartCommand)
export class ClearCartHandler implements ICommandHandler<ClearCartCommand> {
  constructor(private readonly cartService: CartService) {}

  async execute(command: ClearCartCommand): Promise<Observable<CartDocument>> {
    return from(this.cartService.findUserCart(command.user)).pipe(
      map((cart: CartDocument) => {
        cart.products = [];
        cart.save();
        return cart;
      }),
    );
  }
}
