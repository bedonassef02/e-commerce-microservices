import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { from } from 'rxjs';
import { CreateWishlistCommand } from '../impl/create-wishlist.command';
import { WishlistService } from '../../wishlist.service';

@CommandHandler(CreateWishlistCommand)
export class CreateWishlistHandler implements ICommandHandler<CreateWishlistCommand> {
  constructor(private readonly wishlistService: WishlistService) {}

  async execute(command: CreateWishlistCommand) {
    return from(this.wishlistService.create(command.user));
  }
}
