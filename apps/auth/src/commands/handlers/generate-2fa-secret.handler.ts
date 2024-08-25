import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Generate2FASecretCommand } from '../impl/generate-2fa-secret.command';
import { TwoFactorService } from '../../utils/services/two-factor-auth.service';
import { Inject, Logger } from '@nestjs/common';
import { USER_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { catchError, defer, map, switchMap, tap } from 'rxjs';
import { UserDocument } from '../../../../user/src/entities/user.entity';
import { TwoFactorDto } from '@app/common/dto/auth/two-factor.dto';

@CommandHandler(Generate2FASecretCommand)
export class Generate2faSecretHandler
  implements ICommandHandler<Generate2FASecretCommand>
{
  private readonly logger = new Logger(Generate2faSecretHandler.name);

  constructor(
    private readonly twoFactorService: TwoFactorService,
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  async execute(command: Generate2FASecretCommand) {
    return this.userService
      .send<UserDocument>(Commands.Crud.FIND_BY_ID, command.id)
      .pipe(switchMap((user) => this.generateAndSend2FASecret(user)));
  }

  private generateAndSend2FASecret(user: UserDocument) {
    const secret = this.twoFactorService.generateSecret(user.email);
    const otpAuthURL = this.twoFactorService.generateOTPAuthURL(
      secret,
      user.email,
    );

    return defer(() => this.twoFactorService.generateQRCode(otpAuthURL)).pipe(
      switchMap((qrCode) =>
        this.sendTwoFASecret(user._id.toString(), secret).pipe(
          map(() => ({ qrCode })),
        ),
      ),
    );
  }

  private sendTwoFASecret(userId: string, secret: string) {
    const twoFADto: TwoFactorDto = {
      user: userId,
      twoFactorSecret: secret,
      isTwoFactorEnabled: false,
    };

    return this.userService
      .send(Commands.User.TWO_FA, twoFADto)
      .pipe(tap(() => this.logger.log(`2FA secret sent for user: ${userId}`)));
  }
}
