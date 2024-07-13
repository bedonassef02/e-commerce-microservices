import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ProductType = HydratedDocument<Product>;

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop({ default: 0 })
  stock: number;
  @Prop()
  image: string[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
