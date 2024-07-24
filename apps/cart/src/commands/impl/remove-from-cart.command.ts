import { CartDto } from '@app/common/dto/cart/cart.dto';

export class RemoveFromCartCommand {
  constructor(public readonly cartDto: CartDto) {}
}
