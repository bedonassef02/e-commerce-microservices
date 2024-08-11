import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { Model, Promise } from 'mongoose';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';
import { from, Observable } from 'rxjs';
import { UpdateOrderDto } from '@app/common/dto/order/update-order.dto';
import { IPagination } from '@app/common/utils/interfaces/pagination.interface';
import { OrderQuery } from '@app/common/utils/features/order.query';
import { OrderFilter } from '@app/common/utils/filters/order.filter';
import { CustomLoggerService } from '@app/common/utils/logger/logger.service';
import { orderFilter } from './utils/helpers/order-filter.helper';

@Injectable()
export class OrderService implements IPagination {
  private logger = new CustomLoggerService(OrderService.name);
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  create(orderDto: CreateOrderDto): Observable<OrderDocument> {
    return from(this.orderModel.create(orderDto));
  }

  findAll(query: OrderQuery): Observable<Order[]> {
    return from(this.handleQuery(query));
  }

  findById(id: string): Observable<Order> {
    return from(this.orderModel.findById(id).exec());
  }

  update(id: string, updateOrderDto: UpdateOrderDto): Observable<Order> {
    return from(
      this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
        new: true,
      }),
    );
  }

  countDocuments(query: OrderQuery): Observable<number> {
    return from(this.orderModel.countDocuments(query.filter));
  }

  filter(query: OrderQuery): OrderFilter {
    return orderFilter(query);
  }

  handleQuery(query: OrderQuery): Promise<any[]> {
    return this.orderModel
      .find(this.filter(query))
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .exec();
  }
}
