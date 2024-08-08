import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { Model } from 'mongoose';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';
import { from, Observable } from 'rxjs';
import { UpdateOrderDto } from '@app/common/dto/order/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}
  create(orderDto: CreateOrderDto): Observable<OrderDocument> {
    return from(this.orderModel.create(orderDto));
  }

  findAll(user: string): Observable<Order[]> {
    return from(this.orderModel.find({ user }).exec());
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
}
