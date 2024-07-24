import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { CartProduct } from '../utils/product-cart';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop([
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ])
  products: CartProduct[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true })
  user: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
