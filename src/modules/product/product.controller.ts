import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { productService } from './product.service';

const create = catchAsync(async (req, res) => {
  const result = await productService.createIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Product added successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await productService.getAllFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.getByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const productInfo = req.body;
  const result = await productService.updateByIdFromDB(id, productInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.deleteByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const productController = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
