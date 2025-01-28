import mongoose from 'mongoose';
import { TUser } from './user.type';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new mongoose.Schema<TUser>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.BCRYPT_SALT_ROUNDS),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = mongoose.model<TUser>('User', userSchema);
