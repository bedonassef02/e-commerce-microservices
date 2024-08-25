import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { Logger } from '@nestjs/common';
import { UpdatePasswordCommand } from '../impl/update-password.command';
import { TwoFactorCommand } from '../impl/two-factor.command';

@CommandHandler(TwoFactorCommand)
export class TwoFactorHandler implements ICommandHandler<TwoFactorCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: TwoFactorCommand) {
    return this.userService.update2FA(command.twoFactorDto);
  }
}
