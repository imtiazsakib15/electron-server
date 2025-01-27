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

export const productController = {
  create,
};
