import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ default: 0, min: 0 })
  stock: number;

  @Prop({ type: [String], required: true })
  cover: string[];

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Types.ObjectId;

  @Prop({ default: [], type: [String] })
  tags: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index(
  { name: 'text', description: 'text' },
  { weights: { name: 5, description: 3 } },
);

ProductSchema.index({ price: 1, stock: -1, category: 1 });
