import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { PAYMENT_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { Public } from '@app/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@UseGuards(AuthGuard)
@UseInterceptors(RpcExceptionInterceptor)
@Controller({ path: 'payment', version: '1' })
export class PaymentController {
  constructor(@Inject(PAYMENT_SERVICE) private paymentService: ClientProxy) {}

  @Public()
  @Get('success')
  success(@Query('order') order: string) {
    return this.paymentService.send(Commands.Payment.SUCCESS, order);
  }
}
