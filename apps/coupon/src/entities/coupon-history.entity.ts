import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Cart } from 'apps/cart/src/entites/cart.entity';
import { HydratedDocument } from 'mongoose';

export type CouponHistoryDocument = HydratedDocument<CouponHistory>;

@Schema({ timestamps: true })
export class CouponHistory {
  @Prop()
  code: string;
  @Prop()
  user: string;
  @Prop()
  cart: Cart;
}

export const CouponHistorySchema = SchemaFactory.createForClass(CouponHistory);
