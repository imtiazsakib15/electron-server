import { TJwtPayload } from './auth.type';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const generateToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => jwt.sign(payload, secret, { expiresIn });

export const isPasswordMatch = async (
  password: string,
  hashedPassword: string,
) => await bcrypt.compare(password, hashedPassword);

export const verifyToken = (token: string, tokenSecret: string) => {
  try {
    return jwt.verify(token, tokenSecret);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, ' Unauthorized');
  }
};
