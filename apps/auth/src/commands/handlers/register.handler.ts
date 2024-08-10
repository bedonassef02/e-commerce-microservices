import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../../auth.service';
import { RegisterCommand } from '../impl/register.command';
import { throwException } from '@app/common/utils/exception/throw-excpetion';
import { TokenService } from '@app/common/services/token.service';
import { map } from 'rxjs';
import { UserDocument } from '../../../../user/src/entities/user.entity';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: RegisterCommand) {
    return this.authService.register(command.registerDto).pipe(
      map((user: UserDocument) => {
        return this.authService.generateResponse(user);
      }),
      throwException,
    );
  }
}
