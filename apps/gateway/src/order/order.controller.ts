import {
  Controller,
  Get,
  Inject,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { ORDER_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { User } from '@app/common/decorators/user.decorator';
import { FindOrderDto } from '@app/common/dto/order/find-order.dto';

@UseInterceptors(RpcExceptionInterceptor)
@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(@Inject(ORDER_SERVICE) private orderService: ClientProxy) {}

  @Get()
  findAll(@User('id') user: string) {
    return this.orderService.send(Commands.FIND_ALL, user);
  }

  @Get(':id')
  findById(@User('id') user: string, @Param('id') order: string) {
    const orderDto: FindOrderDto = { order, user };
    return this.orderService.send(Commands.FIND_BY_ID, orderDto);
  }
}
