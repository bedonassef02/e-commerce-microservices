import { Processor, WorkerHost } from '@nestjs/bullmq';
import { ORDER_QUEUE } from '@app/common/utils/constants/queue.constants';
import { Job } from 'bullmq';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Logger } from '@nestjs/common';
import {
  CART_SERVICE,
  COUPON_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { Order } from '../../entities/order.entity';
import { UseCouponDto } from '@app/common/dto/coupon/use-coupon.dto';
import { finalize } from 'rxjs';
import { CheckoutService } from '../../services/checkout.service';
import { Commands } from '@app/common/utils/types/crud.interface';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@Processor(ORDER_QUEUE)
export class OrderConsumer extends WorkerHost {
  private readonly logger = new Logger(OrderConsumer.name);

  constructor(
    @Inject(CART_SERVICE) private readonly cartService: ClientProxy,
    @Inject(COUPON_SERVICE) private readonly couponService: ClientProxy,
    private readonly checkoutService: CheckoutService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<void> {
    const order: Order = job.data;
    try {
      await this.clearCart(order.user);
      await this.useCoupon(order);
    } catch (error) {
      this.logger.error('Order processing failed', error);
      throw error;
    }
  }

  private clearCart(user: string) {
    return this.checkoutService
      .clearCart(user)
      .pipe(
        throwException,
        finalize(() => this.logger.log('Cart clearing process completed')),
      )
      .toPromise();
  }

  private useCoupon(order: Order) {
    if (!order.coupon) {
      return Promise.resolve();
    }

    const couponDto: UseCouponDto = this.createCouponDto(order);
    return this.couponService
      .send(Commands.Coupon.USE, couponDto)
      .pipe(
        throwException,
        finalize(() => this.logger.log('Coupon application process completed')),
      )
      .toPromise();
  }

  private createCouponDto(order: Order): UseCouponDto {
    return {
      order: order.id,
      user: order.user,
      code: order.coupon?.code,
    };
  }
}
