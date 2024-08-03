import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { MessagePattern } from '@nestjs/microservices';
import { MailDto } from '@app/common/dto/mail/mail.dto';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ cmd: 'SEND' })
  send(mailDto: MailDto) {
    return this.mailService.send(mailDto);
  }
}
