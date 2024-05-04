import { NextFunction, Response } from 'express';
import { RequestType } from '../../utils/interfaces';
import { AuthService } from './service';

export class AuthController {
  static login(req: RequestType, res: Response, next: NextFunction) {
    return AuthService.login(req, res, next);
  }

  static register(req: RequestType, res: Response, next: NextFunction) {
    return AuthService.register(req, res, next);
  }

  static verify(req: RequestType, res: Response) {
    return AuthService.verify(req, res);
  }
}
