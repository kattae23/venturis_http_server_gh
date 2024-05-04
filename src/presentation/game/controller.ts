import { NextFunction, Response } from 'express';
import { RequestType } from '../../utils/interfaces';
import { GameService } from './service';

export class GameController {
  static async getCharacter(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    return GameService.getCharacter(req, res, next);
  }
  static async updateUser(req: RequestType, res: Response) {
    return GameService.updateUser(req, res);
  }
}
