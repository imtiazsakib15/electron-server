import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from './product.model';
import { TProduct } from './product.type';
import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './product.constant';

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

const getAllFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .pagination()
    .fieldLimiting();

  const result = await productQuery.modelQuery;

  return result;
};

export const productService = {
  createIntoDB,
  getAllFromDB,
};
