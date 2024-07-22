import { Controller, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern(Commands.FIND_BY_ID)
  getCart(user: string) {}

  @MessagePattern()
  addToCart(@Payload() payload: any) {
    const { user, productId, quantity } = payload;
  }
}
