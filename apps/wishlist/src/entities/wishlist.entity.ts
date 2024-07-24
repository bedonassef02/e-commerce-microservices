import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WishlistDocument = HydratedDocument<Wishlist>;

@Schema({ timestamps: true })
export class Wishlist {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: Types.ObjectId;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Product',
    default: [],
  })
  products: string[];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
