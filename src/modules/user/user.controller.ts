import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { userService } from './user.service';

const getAll = catchAsync(async (req, res) => {
  const result = await userService.getAllFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateById = catchAsync(async (req, res) => {
  const { name, role, isDeleted } = req.body;
  const result = await userService.updateByIdFromDB(req.params.id, {
    name,
    role,
    isDeleted,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

export const userController = { getAll, updateById };
