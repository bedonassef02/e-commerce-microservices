import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../../auth.service';
import { RegisterCommand } from '../impl/register.command';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: RegisterCommand) {
    return this.authService.register(command.registerDto).pipe(throwException);
  }
}
