import { z } from 'zod';

export const ProductSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be a positive value'),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Each image must be a valid URL'),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateProductSchema = ProductSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateProductSchema = ProductSchema.partial().omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});
