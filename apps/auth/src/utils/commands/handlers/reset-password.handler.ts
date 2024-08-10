import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ResetPasswordCommand } from '../impl/reset-password.command';
import { Inject } from '@nestjs/common';
import {
  MAIL_SERVICE,
  USER_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { from, map, mergeMap, switchMap } from 'rxjs';
import {
  createResetToken,
  resetPasswordExpires,
} from '../../helpers/create-reset-token.helper';
import { Token } from '../../../entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commands } from '@app/common/utils/commands';
import { MailDto } from '@app/common/dto/mail/mail.dto';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
    @Inject(MAIL_SERVICE) private readonly mailService: ClientProxy,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async execute(command: ResetPasswordCommand) {
    return this.createAndSaveToken(command.email).pipe(
      mergeMap((token: Token) =>
        this.sendResetEmail(command.email, token.resetToken),
      ),
      map(() => ({
        message: 'Check your email for password reset instructions.',
      })),
      throwException,
    );
  }

  private createAndSaveToken(email: string) {
    const tokenData = {
      resetToken: createResetToken(),
      expirationDate: resetPasswordExpires(),
      email,
    };

    return from(this.tokenRepository.findOneBy({ email })).pipe(
      switchMap((existingToken: Token | null) => {
        if (existingToken) {
          existingToken.resetToken = tokenData.resetToken;
          existingToken.expirationDate = tokenData.expirationDate;
          return from(this.tokenRepository.save(existingToken));
        } else {
          const newToken = this.tokenRepository.create(tokenData);
          return from(this.tokenRepository.save(newToken));
        }
      }),
    );
  }

  private sendResetEmail(email: string, resetToken: string) {
    const mailDto: MailDto = this.createMail(email, resetToken);
    return this.mailService
      .send(Commands.Mail.SEND, mailDto)
      .pipe(throwException);
  }

  private createMail(email: string, token: string): MailDto {
    const subject = 'Reset your password';
    const text = `You can reset your password using the following link: http://localhost:3000/auth/password/reset/${token}`;
    return { to: email, subject, text };
  }
}
