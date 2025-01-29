import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { UpdateUser } from './user.type';

const getAllFromDB = async () => {
  const result = await User.find();
  return result;
};

const updateByIdFromDB = async (id: string, payload: UpdateUser) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  return result;
};

const deleteByIdFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  return result;
};

export const userService = {
  getAllFromDB,
  updateByIdFromDB,
  deleteByIdFromDB,
};
