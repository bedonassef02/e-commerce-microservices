import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CART_SERVICE } from '@app/common/utils/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { CartDto } from '@app/common/dto/cart/cart.dto';
import { User } from '@app/common/decorators/user.decorator';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';

@UseInterceptors(RpcExceptionInterceptor)
@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(@Inject(CART_SERVICE) private cartService: ClientProxy) {}
  @Post()
  add(@User('id') user: string, @Body() cartDto: CartDto) {
    cartDto.user = user;
    return this.cartService.send(Commands.Cart.ADD, cartDto);
  }
  @Delete('clear')
  clear(@User('id') user: string) {
    return this.cartService.send(Commands.Cart.CLEAR, user);
  }

  @Delete()
  remove(@User('id') user: string, @Body() cartDto: CartDto) {
    cartDto.user = user;
    return this.cartService.send(Commands.Cart.REMOVE, cartDto);
  }

  @Get()
  findByUser(@User('id') user: string) {
    return this.cartService.send(Commands.Cart.FIND_BY_USER, user);
  }
}
