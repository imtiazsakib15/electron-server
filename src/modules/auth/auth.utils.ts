import { TJwtPayload } from './auth.type';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generateToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => jwt.sign(payload, secret, { expiresIn });

export const isPasswordMatch = async (
  password: string,
  hashedPassword: string,
) => await bcrypt.compare(password, hashedPassword);
