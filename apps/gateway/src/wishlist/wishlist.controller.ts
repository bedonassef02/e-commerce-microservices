import { Controller, Inject, Post } from '@nestjs/common';
import {
  CART_SERVICE,
  WISHLIST_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';

@Controller('wishlist')
export class WishlistController {
  constructor(@Inject(WISHLIST_SERVICE) private wishlistService: ClientProxy) {}
  @Post()
  create() {
    return this.wishlistService.send(Commands.CREATE, 'ss');
  }
}
