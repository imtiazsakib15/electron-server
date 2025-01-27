import mongoose from 'mongoose';
import { TProduct } from './product.type';

const productSchema = new mongoose.Schema<TProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const Product = mongoose.model<TProduct>('Product', productSchema);
