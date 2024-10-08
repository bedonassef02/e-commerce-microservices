import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { ORDER_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { User } from '@app/common/decorators/user.decorator';
import { FindOrderDto } from '@app/common/dto/order/find-order.dto';
import { ParseMongoIdPipe } from '@app/common/pipes/parse-mongo-id.pipe';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';
import { OrderQuery } from '@app/common/utils/features/order.query';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('order')
@UseInterceptors(RpcExceptionInterceptor)
@Controller({ path: 'order', version: '1' })
export class OrderController {
  constructor(@Inject(ORDER_SERVICE) private orderService: ClientProxy) {}

  @Post()
  create(@User('id') user: string, @Body() orderDto: CreateOrderDto) {
    orderDto.user = user;
    return this.orderService.send(Commands.Crud.CREATE, orderDto);
  }

  @Get()
  findAll(@User('id') user: string, @Query() query: OrderQuery) {
    query.user = user;
    return this.orderService.send(Commands.Crud.FIND_ALL, query);
  }

  @Get(':id')
  findById(
    @User('id') user: string,
    @Param('id', ParseMongoIdPipe) order: string,
  ) {
    const orderDto: FindOrderDto = { order, user };
    return this.orderService.send(Commands.Crud.FIND_BY_ID, orderDto);
  }
}
