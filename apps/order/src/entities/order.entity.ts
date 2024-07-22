import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], required: true })
  products: Types.ObjectId[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: false })
  deleted: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre(/^find/, function (next) {
  this.where({ deleted: { $ne: true } });
  next();
});
