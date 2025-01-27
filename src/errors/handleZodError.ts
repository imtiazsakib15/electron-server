import { ZodError, ZodIssue } from 'zod';
import { IErrorSource, IGenericErrorResponse } from '../interfaces/error';
import httpStatus from 'http-status';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errorSources: IErrorSource[] = err?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
