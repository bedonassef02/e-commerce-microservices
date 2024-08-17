import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
@Schema()
export class Category extends Document {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent: string;
  @Prop()
  description: string;
  @Prop()
  cover: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
