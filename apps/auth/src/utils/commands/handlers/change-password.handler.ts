import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Inject,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { USER_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { map, catchError, switchMap, throwError, Observable } from 'rxjs';
import {
  User,
  UserDocument,
} from '../../../../../user/src/entities/user.entity';
import { Commands } from '@app/common/utils/types/crud.interface';
import { ChangePasswordCommand } from '../impl/change-password.command';
import { PasswordService } from '../../services/password.service';
import { throwException } from '@app/common/utils/exception/throw-excpetion';
import { AuthService } from '../../../auth.service';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
    private readonly passwordService: PasswordService,
    private readonly authService: AuthService,
  ) {}

  async execute(command: ChangePasswordCommand) {
    return this.userService
      .send<User>(Commands.FIND_BY_ID, command.passwordDto.id)
      .pipe(
        switchMap((user: User) => {
          this.isAuth(user, command.passwordDto.password);

          return this.passwordService.change(command.passwordDto);
        }),
        map((updatedUser: UserDocument) => {
          return this.authService.generateResponse(updatedUser);
        }),
        throwException,
      );
  }

  private isAuth(user: User, password: string) {
    if (!this.passwordService.compare(password, user.password)) {
      throw new UnauthorizedException('Incorrect password');
    }
  }
}
