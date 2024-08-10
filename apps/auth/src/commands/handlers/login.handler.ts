import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../impl/login.command';
import { map, Observable } from 'rxjs';
import { UserDocument } from '../../../../user/src/entities/user.entity';
import { AuthService } from '../../auth.service';
import { TokenService } from '@app/common/services/token.service';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LoginCommand): Promise<Observable<any>> {
    return this.authService.login(command.loginDto).pipe(
      map((user: UserDocument) => {
        return this.authService.generateResponse(user);
      }),
    );
  }
}
