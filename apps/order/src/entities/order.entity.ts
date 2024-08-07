import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import mongoose from 'mongoose';
import { OrderStatus } from '../utils/order-status';
import { OrderProduct } from '../utils/order-product';
import { AddressDto } from '@app/common/dto/order/address.dto';
import { OrderPayment } from '../utils/order-payment';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop([
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 },
    },
  ])
  products: OrderProduct[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ type: String, enum: OrderStatus, required: true })
  status: OrderStatus;

  @Prop({ required: true })
  address: AddressDto;

  @Prop({ type: String, enum: OrderPayment, required: true })
  payment: OrderPayment;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
