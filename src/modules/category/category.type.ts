import { z } from 'zod';
import {
  CategorySchema,
  CreateCategorySchema,
  UpdateCategorySchema,
} from './category.schema';

export type TCategory = z.infer<typeof CategorySchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
