import { z } from 'zod';
import {
  ProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
} from './product.schema';

export type TProduct = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
