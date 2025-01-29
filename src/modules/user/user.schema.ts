import { z } from 'zod';

export const UserRole = z.enum(['USER', 'ADMIN']);

export const UserSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be less than 32 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit'),
  role: UserRole.default('USER'),
  isDeleted: z.boolean().default(false),
  createdAt: z.string().datetime({ offset: true }).optional(),
  updatedAt: z.string().datetime({ offset: true }).optional(),
});

export const CreateUserSchema = UserSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});
export const UpdateUserSchema = UserSchema.partial().omit({
  _id: true,
  email: true,
  password: true,
  createdAt: true,
  updatedAt: true,
});
