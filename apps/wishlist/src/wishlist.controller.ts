import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddToWishlistCommand } from './commands/impl/add-to-wishlist.command';
import { GetWishlistQuery } from './queries/impl/get-wishlist.query';
import { CreateWishlistCommand } from './commands/impl/create-wishlist.command';
import { ClearWishlistCommand } from './commands/impl/clear-wishlist.command';
import { RemoveFromWishlistCommand } from './commands/impl/remove-from-wishlist.command';
import { WishlistDto } from '@app/common/dto/wishlist/wishlist.dto';

@Controller()
export class WishlistController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.Wishlist.ADD)
  add(wishlistDto: WishlistDto) {
    return this.commandBus.execute(new AddToWishlistCommand(wishlistDto));
  }

  @MessagePattern(Commands.Wishlist.CLEAR)
  clear(user: string) {
    return this.commandBus.execute(new ClearWishlistCommand(user));
  }

  @MessagePattern(Commands.Wishlist.REMOVE)
  remove(wishlistDto: WishlistDto) {
    return this.commandBus.execute(new RemoveFromWishlistCommand(wishlistDto));
  }

  @MessagePattern(Commands.Wishlist.FIND_BY_USER)
  findOne(user: string) {
    return this.queryBus.execute(new GetWishlistQuery(user));
  }

  @MessagePattern(Commands.Crud.CREATE)
  create(user: string) {
    return this.commandBus.execute(new CreateWishlistCommand(user));
  }
}
