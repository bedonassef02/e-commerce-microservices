import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import mongoose from 'mongoose';
import { OrderStatus } from '../utils/order-status';
import { OrderProduct } from '../utils/order-product';
import { AddressDto } from '@app/common/dto/order/address.dto';
import { OrderPayment } from '../utils/order-payment';
import { Product } from '../../../product/src/entities/product.entity';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop()
  products: Product[];

  @Prop({ required: true })
  price: number;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({ required: true })
  address: AddressDto;

  @Prop({ type: String, enum: OrderPayment, required: true })
  payment: OrderPayment;

  @Prop({ type: String })
  url: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
