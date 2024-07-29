import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { from, lastValueFrom, mergeMap } from 'rxjs';
import { RpcConflictException } from '@app/common/exceptions/rpc-conflict-exception';
import { CreateCouponCommand } from '../impl/create-coupon.command';
import { CouponService } from '../../coupon.service';
import { Coupon } from '../../entities/coupon.entity';

@CommandHandler(CreateCouponCommand)
export class CreateCouponHandler
  implements ICommandHandler<CreateCouponCommand>
{
  constructor(private readonly couponService: CouponService) {}

  async execute(command: CreateCouponCommand): Promise<Coupon> {
    const coupon$ = from(
      this.couponService.findOne(command.couponDto.code),
    ).pipe(
      mergeMap((existingCoupon: Coupon) => {
        if (existingCoupon) {
          throw new RpcConflictException(Coupon.name);
        }

        return from(this.couponService.create(command.couponDto));
      }),
    );

    return await lastValueFrom(coupon$);
  }
}
