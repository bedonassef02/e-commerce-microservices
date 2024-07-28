import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../impl/login.command';
import { map, Observable } from 'rxjs';
import { UserDocument } from '../../../../user/src/entities/user.entity';
import { AuthService } from '../../auth.service';
import { TokenService } from '@app/common/services/token.service';
import { Logger } from '@nestjs/common';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  private readonly logger = new Logger(LoginHandler.name);
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: LoginCommand): Promise<Observable<any>> {
    return this.authService.login(command.loginDto).pipe(
      map((user: UserDocument) => {
        this.logger.log({ user });
        const token: string = this.tokenService.generate(user);
        return { token };
      }),
    );
  }
}
