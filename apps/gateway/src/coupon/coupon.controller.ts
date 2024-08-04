import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { COUPON_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { Commands } from '@app/common/utils/types/crud.interface';
import { RoleGuard } from '@app/common/guards/role.guard';
import { Roles } from '@app/common/decorators/role.decorator';
import { Role } from '@app/common/utils/constants/constants';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { CreateCouponDto } from '@app/common/dto/coupon/create-coupon.dto';
import { UseCoupnDto } from '@app/common/dto/coupon/use-coupon.dto';
import { User } from '@app/common/decorators/user.decorator';

@UseInterceptors(RpcExceptionInterceptor)
@UseGuards(AuthGuard)
@Controller('coupon')
export class CouponController {
  constructor(@Inject(COUPON_SERVICE) private couponService: ClientProxy) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  create(@Body() couponDto: CreateCouponDto) {
    return this.couponService.send(Commands.Coupon.CREATE, couponDto);
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.couponService.send(Commands.Coupon.FIND_ONE, code);
  }
  @Get(':code/valid')
  canUse(@User('id') user: string, @Param('code') code: string) {
    const couponDto: UseCoupnDto = { code, user };
    return this.couponService.send(Commands.Coupon.CAN_USE, couponDto);
  }
}
