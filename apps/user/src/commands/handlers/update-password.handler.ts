import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { Logger } from '@nestjs/common';
import { UpdatePasswordCommand } from '../impl/update-password.command';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler
  implements ICommandHandler<UpdatePasswordCommand>
{
  private readonly logger = new Logger(UpdatePasswordHandler.name);

  constructor(private readonly userService: UserService) {}

  async execute(command: UpdatePasswordCommand) {
    const { id, newPassword } = command.passwordDto;
    return this.userService.updatePassword(id, newPassword);
  }
}
