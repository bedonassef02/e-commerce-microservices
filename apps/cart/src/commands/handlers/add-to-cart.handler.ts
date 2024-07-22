import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { AddToCartCommand } from '../impl/add-to-cart.command';
import { CartService } from '../../cart.service';
import { Cart, CartDocument } from '../../entites/cart.entity';

@CommandHandler(AddToCartCommand)
export class AddToCartHandler implements ICommandHandler<AddToCartCommand> {
  constructor(private readonly cartService: CartService) {}

  async execute(command: AddToCartCommand) {
    return this.cartService.findUserCart(command.cartDto.user).pipe(
      map((cart: CartDocument) => {
        if (!cart) {
          return this.cartService.create(command.cartDto);
        } else {
          return this.cartService
            .productIndex(cart, command.cartDto.product)
            .pipe(
              map((index: number) => {
                if (index === -1) {
                  cart.products.push({
                    product: command.cartDto.product,
                    quantity: 1,
                  });
                } else {
                  cart.products[index].quantity += command.cartDto.quantity;
                }
                return cart.save();
              }),
            );
        }
      }),
    );
  }
}
