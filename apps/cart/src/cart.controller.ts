import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { CartDto } from '@app/common/dto/cart/cart.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddToCartCommand } from './commands/impl/add-to-cart.command';
import { GetCartQuery } from './queries/impl/get-cart.query';
import { ClearCartCommand } from './commands/impl/clear-cart.command';
import { RemoveFromCartCommand } from './commands/impl/remove-from-cart.command';
import { CreateCartCommand } from './commands/impl/create-cart.command';

@Controller()
export class CartController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.Cart.ADD)
  add(cartDto: CartDto) {
    return this.commandBus.execute(new AddToCartCommand(cartDto));
  }

  @MessagePattern(Commands.Cart.CLEAR)
  clear(user: string) {
    return this.commandBus.execute(new ClearCartCommand(user));
  }

  // TODO: update quantity

  @MessagePattern(Commands.Cart.REMOVE)
  remove(cartDto: CartDto) {
    return this.commandBus.execute(new RemoveFromCartCommand(cartDto));
  }

  @MessagePattern(Commands.Cart.FIND_BY_USER)
  findOne(user: string) {
    return this.queryBus.execute(new GetCartQuery(user));
  }

  @MessagePattern(Commands.CREATE)
  create(user: string) {
    return this.commandBus.execute(new CreateCartCommand(user));
  }
}
