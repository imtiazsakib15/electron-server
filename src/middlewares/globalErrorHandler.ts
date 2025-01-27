import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { IErrorSource } from '../interfaces/error';
import config from '../config';
import mongoose from 'mongoose';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string | number = 'Internal Server Error!';
  let errorSources: IErrorSource[] = [
    {
      path: '',
      message: '',
    },
  ];

  if (err instanceof ZodError) {
    const error = handleZodError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorSources = error.errorSources;
  } else if (err instanceof mongoose.Error.ValidationError) {
    const error = handleValidationError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorSources = error.errorSources;
  } else if (err instanceof mongoose.Error.CastError) {
    const error = handleCastError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorSources = error.errorSources;
  } else if (err.code === 11000) {
    const error = handleDuplicateError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorSources = error.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
