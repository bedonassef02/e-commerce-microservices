import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { from } from 'rxjs';
import { CartService } from '../../cart.service';
import { CreateCartCommand } from '../impl/create-cart.command';

@CommandHandler(CreateCartCommand)
export class CreateCartHandler implements ICommandHandler<CreateCartCommand> {
  constructor(private readonly cartService: CartService) {}

  async execute(command: CreateCartCommand) {
    return from(this.cartService.create(command.user));
  }
}
