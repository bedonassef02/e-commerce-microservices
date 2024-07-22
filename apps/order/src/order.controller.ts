import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';
import { Order } from './entities/order.entity';
import { Observable } from 'rxjs';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern(Commands.CREATE)
  create(orderDto: CreateOrderDto): Observable<Order> {
    return this.orderService.create(orderDto);
  }

  @MessagePattern(Commands.FIND_ALL)
  findAll(): Observable<Order[]> {
    return this.orderService.findAll();
  }

  @MessagePattern(Commands.FIND_BY_ID)
  findById(id: string): Observable<Order | null> {
    return this.orderService.findById(id);
  }

  @MessagePattern(Commands.UPDATE)
  update(id: string, updateOrderDto: CreateOrderDto): Observable<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @MessagePattern(Commands.DELETE)
  remove(id: string): Observable<Order> {
    return this.orderService.remove(id);
  }
}
