import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/user/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetUserByIdCommand } from './queries/impl/get-user-by-id.command';
import { GetUserByEmailCommand } from './queries/impl/get-user-by-email.command';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'create' })
  create(user: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(user));
  }

  @MessagePattern({ cmd: 'findById' })
  findById(id: string) {
    return this.queryBus.execute(new GetUserByIdCommand(id));
  }

  @MessagePattern({ cmd: 'findByEmail' })
  findByEmail(email: string) {
    return this.queryBus.execute(new GetUserByEmailCommand(email));
  }
}
