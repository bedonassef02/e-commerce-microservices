import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from '@app/common/dto/mail/mail.dto';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MailService {
  private email: string;
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.email = this.configService.get<string>('EMAIL_ADDRESS');
  }

  send(mailDto: MailDto) {
    mailDto.from = this.email;
    return this.mailService
      .sendMail(mailDto)
      .then(() => {
        return 'Email Send Success to: ' + mailDto.to;
      })
      .catch((err) => {
        this.logger.error({ err });
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Falied to send email to :' + mailDto.to,
        });
      });
  }
}
