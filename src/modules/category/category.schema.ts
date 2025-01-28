import { z } from 'zod';

export const CategorySchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Category name is required'),
  description: z.string().optional(),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateCategorySchema = CategorySchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateCategorySchema = CategorySchema.partial().omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});
