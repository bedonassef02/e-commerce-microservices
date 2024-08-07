import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { PAYMENT_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@app/common/decorators/user.decorator';
import { CheckoutDto } from '@app/common/dto/payment/checkout.dto';
import { Commands } from '@app/common/utils/types/crud.interface';
import { Public } from '@app/common/decorators/public.decorator';
@UseInterceptors(RpcExceptionInterceptor)
@UseGuards(AuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(@Inject(PAYMENT_SERVICE) private paymentService: ClientProxy) {}
  @Post('checkout')
  checkout(@User('id') user: string, @Body() checkoutDto: CheckoutDto) {
    checkoutDto.user = user;
    return this.paymentService.send(Commands.Payment.CHECKOUT, checkoutDto);
  }

  @Public()
  @Get('success')
  success(@Query('user') user: string) {
    return this.paymentService.send(Commands.Payment.SUCCESS, user);
  }
}
