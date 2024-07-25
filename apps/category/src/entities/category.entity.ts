import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
@Schema()
export class Category extends Document {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  patent: string;
  @Prop()
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
