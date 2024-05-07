import { Response } from 'express';
import { RequestType } from '../../utils/interfaces';
import { AuthService } from './service';

export class AuthController {
  static login(req: RequestType, res: Response) {
    return AuthService.login(req, res);
  }

  static register(req: RequestType, res: Response) {
    return AuthService.register(req, res);
  }

  static verify(req: RequestType, res: Response) {
    return AuthService.verify(req, res);
  }
}
