import { Router } from 'express';
import { GameRoutes } from './game/routes';
import { AuthRoutes } from './auth/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api', AuthRoutes.routes);
    router.use('/api', GameRoutes.routes);

    return router;
  }
}
