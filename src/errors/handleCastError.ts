import httpStatus from 'http-status';
import { IErrorSource, IGenericErrorResponse } from '../interfaces/error';
import mongoose from 'mongoose';

const handleCastError = (
  err: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errorSources: IErrorSource[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;
