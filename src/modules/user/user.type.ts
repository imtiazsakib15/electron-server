import { z } from 'zod';
import { CreateUserSchema, UpdateUserSchema, UserSchema } from './user.schema';

export type TUser = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
