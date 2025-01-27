import httpStatus from 'http-status';
import { IErrorSource, IGenericErrorResponse } from '../interfaces/error';
import mongoose from 'mongoose';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errorSources: IErrorSource[] = Object.values(err?.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: value.path,
      message: value.message,
    }),
  );

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
