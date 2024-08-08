import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CouponHistoryDocument = HydratedDocument<CouponHistory>;

@Schema({ timestamps: true })
export class CouponHistory {
  @Prop()
  code: string;
  @Prop()
  user: string;
  @Prop()
  order: string;
}

export const CouponHistorySchema = SchemaFactory.createForClass(CouponHistory);
