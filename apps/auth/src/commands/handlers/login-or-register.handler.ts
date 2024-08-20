import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../impl/login.command';
import { map, Observable } from 'rxjs';
import { UserDocument } from '../../../../user/src/entities/user.entity';
import { AuthService } from '../../auth.service';
import { LoginOrRegisterCommand } from '../impl/login-or-register.command';

@CommandHandler(LoginOrRegisterCommand)
export class LoginOrRegisterHandler implements ICommandHandler<LoginOrRegisterCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LoginOrRegisterCommand): Promise<Observable<any>> {
    return this.authService.loginOrRegister(command.registerDto).pipe(
      map((user: UserDocument) => {
        return this.authService.generateResponse(user);
      }),
    );
  }
}
