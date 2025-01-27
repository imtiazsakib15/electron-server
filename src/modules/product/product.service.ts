import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from './product.model';
import { CreateProduct, UpdateProduct } from './product.type';
import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './product.constant';

const createIntoDB = async (payload: CreateProduct) => {
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

const getByIdFromDB = async (id: string) => {
  const result = await Product.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return result;
};

const updateByIdFromDB = async (id: string, payload: UpdateProduct) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return result;
};

export const productService = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdFromDB,
};
