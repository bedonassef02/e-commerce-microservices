import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { MessagePattern } from '@nestjs/microservices';
import { MailDto } from '@app/common/dto/mail/mail.dto';
import { Commands } from '@app/common/utils/types/crud.interface';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern(Commands.Mail.SEND)
  send(mailDto: MailDto) {
    return this.mailService.send(mailDto);
  }
}
