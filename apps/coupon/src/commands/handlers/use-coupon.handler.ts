import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CouponService } from '../../coupon.service';
import { UseCouponCommand } from '../impl/use-coupon.command';

@CommandHandler(UseCouponCommand)
export class UseCouponHandler implements ICommandHandler<UseCouponCommand> {
  constructor(private readonly couponService: CouponService) {}

  async execute(command: UseCouponCommand) {
    return this.couponService.use(command.couponDto);
  }
}
