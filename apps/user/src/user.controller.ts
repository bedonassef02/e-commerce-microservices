import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/user/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetUserByIdCommand } from './queries/impl/get-user-by-id.command';
import { GetUserByEmailCommand } from './queries/impl/get-user-by-email.command';
import { Commands } from '@app/common/utils/commands';
import { ChangePasswordDto } from '@app/common/dto/auth/change-password.dto';
import { UpdatePasswordCommand } from './commands/impl/update-password.command';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.Crud.CREATE)
  create(user: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(user));
  }

  @MessagePattern(Commands.Crud.FIND_BY_ID)
  findById(id: string) {
    return this.queryBus.execute(new GetUserByIdCommand(id));
  }

  @MessagePattern(Commands.User.FIND_BY_EMAIL)
  findByEmail(email: string) {
    return this.queryBus.execute(new GetUserByEmailCommand(email));
  }

  @MessagePattern(Commands.User.UPDATE_PASSWORD)
  updatePassword(passwordDto: ChangePasswordDto) {
    return this.commandBus.execute(new UpdatePasswordCommand(passwordDto));
  }
}
