import { Processor, WorkerHost } from '@nestjs/bullmq';
import { USER_QUEUE } from '@app/common/utils/constants/queue.constants';
import { Job } from 'bullmq';
import { ClientProxy } from '@nestjs/microservices';
import {
  CART_SERVICE,
  MAIL_SERVICE,
  WISHLIST_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { Inject, Logger } from '@nestjs/common';
import { Commands } from '@app/common/utils/commands';
import { MailDto } from '@app/common/dto/mail/mail.dto';

@Processor(USER_QUEUE)
export class UserConsumer extends WorkerHost {
  private readonly logger = new Logger(UserConsumer.name);
  constructor(
    @Inject(WISHLIST_SERVICE) private wishlistService: ClientProxy,
    @Inject(CART_SERVICE) private cartService: ClientProxy,
    @Inject(MAIL_SERVICE) private mailService: ClientProxy,
  ) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    const { id, email } = job.data;
    this.createCart(id);
    this.createWishlist(id);
    this.sendMail(email);
  }

  private createWishlist(user: string) {
    this.wishlistService.send(Commands.Crud.CREATE, user).subscribe({
      next: () => this.logger.log(`Wishlist Created for user: ${user}`),
      error: (error) =>
        this.logger.error(`Wishlist service error: ${error.message}`),
    });
  }

  private createCart(user: string) {
    this.cartService.send(Commands.Crud.CREATE, user).subscribe({
      next: () => this.logger.log(`Cart Created for user: ${user}`),
      error: (error) =>
        this.logger.error(`Cart service error: ${error.message}`),
    });
  }

  private sendMail(email: string) {
    const mail: MailDto = { to: email, subject: 'Register', text: 'Welcome' };
    this.mailService.send(Commands.Mail.SEND, mail).subscribe({
      next: () => this.logger.log(`Mail sent for user: ${email}`),
      error: (error) =>
        this.logger.error(`Mail service error: ${error.message}`),
    });
  }
}
