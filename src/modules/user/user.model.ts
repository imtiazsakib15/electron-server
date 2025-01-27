import mongoose from 'mongoose';
import { TUser } from './user.type';

const UserSchema = new mongoose.Schema<TUser>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const UserModel = mongoose.model<TUser>('User', UserSchema);
