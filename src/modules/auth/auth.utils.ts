import { TJwtPayload } from './auth.type';
import jwt from 'jsonwebtoken';

export const generateToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => jwt.sign(payload, secret, { expiresIn });
