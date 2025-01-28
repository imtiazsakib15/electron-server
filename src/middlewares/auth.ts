import { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../modules/user/user.model';
import { USER_ROLE } from '../modules/auth/auth.constant';
import { verifyToken } from '../modules/auth/auth.utils';

export const auth = (
  ...checkedRoles: (typeof USER_ROLE)[keyof typeof USER_ROLE][]
) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.headers?.authorization?.split(' ')[1];
    if (!accessToken)
      throw new AppError(httpStatus.UNAUTHORIZED, 'No access token provided');

    // Verify access token signature and decode payload
    const decodedUser = verifyToken(
      accessToken,
      config.ACCESS_TOKEN_SECRET as string,
    );

    if (!decodedUser)
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid access token');

    const { email, role } = decodedUser as JwtPayload;
    const user = await User.findOne({ email });
    if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');

    if (!checkedRoles.includes(user.role) || user.role !== role)
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Unauthorized to perform this action',
      );

    next();
  });
};
