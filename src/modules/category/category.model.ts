import mongoose from 'mongoose';
import { TCategory } from './category.type';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);
categorySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

categorySchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

categorySchema.pre('findOneAndUpdate', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

export const Category = mongoose.model<TCategory>('Category', categorySchema);
