import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ResetPasswordCommand } from '../impl/reset-password.command';
import { HttpStatus, Inject } from '@nestjs/common';
import { USER_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { map } from 'rxjs';
import { User } from '../../../../../user/src/entities/user.entity';
import { compare } from '@app/common/utils/helpers/password.helper';
import { Commands } from '@app/common/utils/types/crud.interface';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}
  async execute(command: ResetPasswordCommand) {
    return this.userService
      .send(Commands.User.FIND_BY_EMAIL, command.email)
      .pipe(
        map((user: User) => {
          return user;
        }),
      );
  }
}
