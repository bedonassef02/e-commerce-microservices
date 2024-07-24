import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import mongoose from 'mongoose';
import { OrderStatus } from '../utils/order-status';
import { OrderProduct } from '../utils/order-product';

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
  address: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
