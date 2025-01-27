import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from './product.model';
import { TProduct } from './product.type';

const createIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create product',
    );
  }
  return result;
};

export const productService = {
  createIntoDB,
};
