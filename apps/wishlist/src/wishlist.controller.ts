import { Controller } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { MessagePattern } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';

@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @MessagePattern(Commands.CREATE)
  create(user: string) {
    return this.wishlistService.create(user);
  }
}
