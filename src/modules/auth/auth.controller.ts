import httpStatus from 'http-status';
import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import { authService } from './auth.service';

const register = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const { user, accessToken, refreshToken } =
    await authService.register(userInfo);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    token: accessToken,
    data: user,
  });
});

const login = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const { user, accessToken, refreshToken } = await authService.login(userInfo);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: user,
  });
});

export const authController = {
  register,
  login,
};
