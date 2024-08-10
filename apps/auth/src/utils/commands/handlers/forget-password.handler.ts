import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ForgetPasswordCommand } from '../impl/forget-password.command';
import { Inject } from '@nestjs/common';
import {
  MAIL_SERVICE,
  USER_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { from, map, mergeMap, tap, catchError, EMPTY, throwError } from 'rxjs';
import { Token } from '../../../entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commands } from '@app/common/utils/types/crud.interface';
import { RpcBadRequestException } from '@app/common/exceptions/rpc-bad-request-exception';
import { UserDocument } from '../../../../../user/src/entities/user.entity';
import { PasswordService } from '../../services/password.service';
import { ChangePasswordDto } from '@app/common/dto/auth/change-password.dto';
import { AuthService } from '../../../auth.service';

@CommandHandler(ForgetPasswordCommand)
export class ForgetPasswordHandler
  implements ICommandHandler<ForgetPasswordCommand>
{
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
    @Inject(MAIL_SERVICE) private readonly mailService: ClientProxy,
    private readonly passwordService: PasswordService,
    private readonly authService: AuthService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async execute(command: ForgetPasswordCommand) {
    return this.getToken(command.forgetPasswordDto.token).pipe(
      mergeMap((token: Token | null) => {
        if (!token) {
          return throwError(
            () =>
              new RpcBadRequestException(
                'Reset token may be expired or invalid.',
              ),
          );
        }
        if (this.isTokenExpired(token)) {
          return throwError(
            () => new RpcBadRequestException('Reset token expired.'),
          );
        }

        return this.userService
          .send(Commands.User.FIND_BY_EMAIL, token.email)
          .pipe(
            mergeMap((user: UserDocument) =>
              this.changePasswordAndRemoveToken(
                user,
                command.forgetPasswordDto.password,
                token,
              ),
            ),
          );
      }),
    );
  }

  private isTokenExpired(token: Token): boolean {
    return token.expirationDate < Date.now();
  }

  private getToken(resetToken: string) {
    return from(this.tokenRepository.findOneBy({ resetToken }));
  }

  private changePasswordAndRemoveToken(
    user: UserDocument,
    newPassword: string,
    token: Token,
  ) {
    const passDto: ChangePasswordDto = { newPassword, id: user.id };
    return this.passwordService.change(passDto).pipe(
      tap(() => {
        from(this.tokenRepository.remove(token)).subscribe();
      }),
      map(() => this.authService.generateResponse(user)),
    );
  }
}
