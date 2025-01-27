import httpStatus from 'http-status';
import { IErrorSource, IGenericErrorResponse } from '../interfaces/error';

const handleDuplicateError = (err: any): IGenericErrorResponse => {
  const path = err.message.match(/: \{\s*([^:]+)\s*:/);
  const value = err.message.match(/"([^"]*)"/);

  const errorSources: IErrorSource[] = [
    {
      path: path[1],
      message: `'${value[1]}' is already exists`,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Already exists',
    errorSources,
  };
};

export default handleDuplicateError;
