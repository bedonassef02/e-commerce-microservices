import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CouponService } from '../../coupon.service';

@Injectable()
export class CouponTaskService {
  private readonly logger = new Logger(CouponTaskService.name);

  constructor(private readonly couponService: CouponService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.debug('Starting scheduled task to remove expired coupons.');

    const deletedCount = await this.couponService.removeMany().toPromise();
    this.logger.log(
      `Expired coupons removed successfully. Total removed: ${deletedCount}`,
    );
  }
}
