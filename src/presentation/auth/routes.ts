import { Request, Response, Router } from 'express';
import passport from '../../middlewares/passport.mid';
import { ErrorType, SessionOptions } from '../../utils/interfaces';
import validate from '../../middlewares/validate';
import { login, register } from '../../validations/auth.validation';
import { AuthController } from './controller';

export class AuthRoutes {
  static get routes(): Router {
    const options = { session: false, failWithError: true };
    const router = Router();

    this.login(router, options);
    this.register(router, options);

    return router;
  }

  static async login(router: Router, options: SessionOptions) {
    router.post(
      '/login',
      validate(login),
      passport.authenticate('login', options),
      AuthController.login,
      this.errorHandler,
    );

    return router;
  }

  static async register(router: Router, options: SessionOptions) {
    router.post(
      '/register',
      validate(register),
      passport.authenticate('register', options),
      AuthController.register,
      this.errorHandler,
    );

    return router;
  }

  static async verifyToken(router: Router, options: SessionOptions) {
    router.get(
      '/',
      validate(register),
      passport.authenticate('register', options),
      AuthController.verify,
      this.errorHandler,
    );

    return router;
  }

  static errorHandler(error: ErrorType, req: Request, res: Response) {
    console.log('Error en el middleware de manejo de errores:', error);
    return res.status(error.statusCode || 400).json({
      statusCode: error.statusCode || 400,
      message: error.message,
    });
  }
}
