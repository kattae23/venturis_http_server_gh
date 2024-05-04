import { NextFunction, Response } from 'express';
import { ErrorType, RequestType } from '../utils/interfaces';
import { verifytoken } from '../utils/token.util';

export default (req: RequestType, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    const userData = verifytoken(token);
    if (userData) {
      return next();
    } else {
      const error = new Error('Bad auth from Auth middleware') as ErrorType;
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
