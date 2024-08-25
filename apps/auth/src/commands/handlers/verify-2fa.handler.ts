import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TwoFactorService } from '../../utils/services/two-factor-auth.service';
import { Inject, Logger } from '@nestjs/common';
import { USER_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { map, switchMap, of, tap } from 'rxjs';
import { UserDocument } from '../../../../user/src/entities/user.entity';
import { RpcException } from '@nestjs/microservices';
import { Verify2faCommand } from '../impl/verify-2fa.command';

@CommandHandler(Verify2faCommand)
export class Verify2faTokenHandler
  implements ICommandHandler<Verify2faCommand>
{
  private readonly logger = new Logger(Verify2faTokenHandler.name);

  constructor(
    private readonly twoFactorService: TwoFactorService,
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  async execute(command: Verify2faCommand) {
    return this.userService
      .send<UserDocument>(Commands.Crud.FIND_BY_ID, command.twoFactorDto.user)
      .pipe(
        switchMap((user) => this.verifyToken(user, command.twoFactorDto.token)),
        tap((isTokenValid) => {
          if (!isTokenValid) {
            throw new RpcException('Invalid 2FA token');
          }
        }),
        switchMap(() => {
          // Update the user's 2FA status if the token is valid
          command.twoFactorDto.isTwoFactorEnabled = true;
          return this.userService.send(
            Commands.User.TWO_FA,
            command.twoFactorDto,
          );
        }),
        map(() => ({ success: true })),
      );
  }

  private verifyToken(user: UserDocument, token: string) {
    const isTokenValid = this.twoFactorService.verifyToken(
      token,
      user.twoFactorSecret,
    );
    return of(isTokenValid);
  }
}
