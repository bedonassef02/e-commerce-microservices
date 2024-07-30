import { Processor, WorkerHost } from '@nestjs/bullmq';
import { USER_QUEUE } from '@app/common/utils/constants/queue.constants';
import { Job } from 'bullmq';
import { ClientProxy } from '@nestjs/microservices';
import { CART_SERVICE, WISHLIST_SERVICE } from '@app/common/utils/constants/service.constants';
import { Inject, Logger } from '@nestjs/common';
import { Commands } from '@app/common/utils/types/crud.interface';

@Processor(USER_QUEUE)
export class UserConsumer extends WorkerHost {
  private readonly logger = new Logger(UserConsumer.name);
  constructor(
    @Inject(WISHLIST_SERVICE) private wishlistService: ClientProxy,
    @Inject(CART_SERVICE) private cartService: ClientProxy,
  ) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    const user = job.data;
    this.createCart(user);
    this.createWishlist(user);
  }

  private createWishlist(user: string) {
    this.wishlistService.send(Commands.CREATE, user).subscribe({
      next: () =>
        this.logger.log(`Wishlist Created for user: ${user}`),
      error: (error) =>
        this.logger.error(`Wishlist service error: ${error.message}`),
    });
  }

  private createCart(user: string) {
    this.cartService.send(Commands.CREATE, user).subscribe({
      next: () => this.logger.log(`Cart Created for user: ${user}`),
      error: (error) =>
        this.logger.error(`Cart service error: ${error.message}`),
    });
  }
}