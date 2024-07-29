import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CouponDocument = HydratedDocument<Coupon>;

@Schema({ timestamps: true })
export class Coupon {
  @Prop({ unique: true })
  code: string;
  @Prop()
  discount: number;
  @Prop()
  minPurchaseAmount: number;
  @Prop({ default: 0 })
  usageCount: number;
  @Prop()
  usageLimitPerCustomer: number;
  @Prop({ default: 100 })
  usageLimit: number;
  @Prop({ default: true })
  isActive: boolean;
  @Prop()
  expirationDate: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
