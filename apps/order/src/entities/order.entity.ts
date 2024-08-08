import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { OrderStatus } from '../utils/order-status';
import { AddressDto } from '@app/common/dto/order/address.dto';
import { OrderPayment } from '../utils/order-payment';
import { Product } from '../../../product/src/entities/product.entity';
import { Coupon } from '../../../coupon/src/entities/coupon.entity';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;

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
  @Prop()
  coupon: Coupon;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
