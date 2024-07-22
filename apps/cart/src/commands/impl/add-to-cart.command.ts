import { CartDto } from '@app/common/dto/cart/cart.dto';

export class AddToCartCommand {
  constructor(public readonly cartDto: CartDto) {}
}
