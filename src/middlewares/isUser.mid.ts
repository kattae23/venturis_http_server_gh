import { NextFunction, Response } from 'express';
import { ErrorType, RequestType } from '../utils/interfaces';
import { verifytoken } from '../utils/token.util';

export default (req: RequestType, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    const data = verifytoken(token, _res);
    const { role } = data;
    if (role === 0) {
      return next();
    } else {
      const error = new Error('Forbidden') as ErrorType;
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
