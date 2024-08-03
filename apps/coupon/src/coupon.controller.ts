import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { CreateCouponDto } from '@app/common/dto/coupon/create-coupon.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCouponCommand } from './commands/impl/create-coupon.command';
import { GetCouponQuery } from './queries/impl/get-coupon.query';
import { CanUseCouponQuery } from './queries/impl/can-use-coupon.query';
import { UseCoupnDto } from '@app/common/dto/coupon/use-coupon.dto';

@Controller()
export class CouponController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.Coupon.CREATE)
  create(couponDto: CreateCouponDto) {
    return this.commandBus.execute(new CreateCouponCommand(couponDto));
  }
  @MessagePattern(Commands.Coupon.FIND_ONE)
  findOne(code: string) {
    return this.queryBus.execute(new GetCouponQuery(code));
  }

  @MessagePattern(Commands.Coupon.CAN_USE)
  canUse(couponDto: UseCoupnDto) {
    return this.queryBus.execute(new CanUseCouponQuery(couponDto));
  }
}
