import { Router } from 'express';
import isUserMid from '../../middlewares/isUser.mid';
import validate from '../../middlewares/validate';
import { updateUser } from '../../validations/user.validation';
import { GameController } from './controller';

export class GameRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/get_character', [isUserMid], GameController.getCharacter);

    router.patch(
      '/update_character',
      [isUserMid, validate(updateUser)],
      GameController.updateUser,
    );

    return router;
  }
}
