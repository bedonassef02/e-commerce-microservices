import { Body, Controller, Delete, Get, Inject, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  WISHLIST_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { User } from '@app/common/decorators/user.decorator';
import { WishlistDto } from '@app/common/dto/wishlist/wishlist.dto';
import { CartDto } from '@app/common/dto/cart/cart.dto';

@UseInterceptors(RpcExceptionInterceptor)
@UseGuards(AuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(@Inject(WISHLIST_SERVICE) private wishlistService: ClientProxy) {}
  @Get()
  findByUser(@User('id') user: string) {
    return this.wishlistService.send(Commands.Wishlist.FIND_BY_USER, user);
  }

  @Post()
  add(@User('id') user: string,@Body() wishlistDto:WishlistDto){
    wishlistDto.user = user;
    return this.wishlistService.send(Commands.Wishlist.ADD, wishlistDto);
  }

  @Delete('clear')
  clear(@User('id') user: string) {
    return this.wishlistService.send(Commands.Wishlist.CLEAR, user);
  }

  @Delete()
  remove(@User('id') user: string, @Body() wishlistDto: WishlistDto) {
    wishlistDto.user = user;
    return this.wishlistService.send(Commands.Cart.REMOVE, wishlistDto);
  }
}
