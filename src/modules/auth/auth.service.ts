import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUser } from '../user/user.type';
import config from '../../config';
import { generateToken } from './auth.utils';

const register = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(httpStatus.CONFLICT, 'Email already in use');
  }

  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to register');
  }

  const jwtPayload = {
    email: newUser.email,
    role: newUser.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.ACCESS_TOKEN_SECRET as string,
    config.ACCESS_TOKEN_EXPIRES_IN as string,
  );
  const refreshToken = generateToken(
    jwtPayload,
    config.REFRESH_TOKEN_SECRET as string,
    config.REFRESH_TOKEN_EXPIRES_IN as string,
  );
  newUser.password = '';

  return { user: newUser, accessToken, refreshToken };
};

export const authService = {
  register,
};
