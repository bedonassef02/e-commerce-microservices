import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../impl/login.command';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../user/src/entities/user.entity';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LoginCommand): Promise<Observable<User>> {
    return this.authService.login(command.loginDto);
  }
}
