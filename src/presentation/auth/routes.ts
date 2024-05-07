import { NextFunction, Request, Response, Router } from 'express';
import passport from '../../middlewares/passport.mid';
import {
  ErrorType,
  PayloadToken,
  RequestType,
  SessionOptions,
  UserInterface,
} from '../../utils/interfaces';
import validate from '../../middlewares/validate';
import { login, register } from '../../validations/auth.validation';
import { AuthController } from './controller';
import isUserMid from '../../middlewares/isUser.mid';
import { createToken } from '../../utils/token.util';

export class AuthRoutes {
  static get routes(): Router {
    const options = { session: false, failWithError: true };
    const router = Router();

    this.login(router, options);
    this.register(router, options);
    this.verifyToken(router);

    return router;
  }

  static async login(router: Router, options: SessionOptions) {
    router.post(
      '/login',
      validate(login),
      async (req: RequestType, res: Response, next: NextFunction) => {
        try {
          passport.authenticate(
            'login',
            options,
            (
              err: Error,
              user: UserInterface | false,
              info: { message: string },
            ) => {
              if (err) {
                return next(err);
              }
              if (!user) {
                return res.status(401).json({ message: info.message });
              }

              const payload: PayloadToken = {
                username: user.username,
                role: user.role,
              };
              const token = createToken(payload);

              req.token = token;

              req.user = user;

              next();
            },
          )(req, res, next);
        } catch (error) {
          return next(error);
        }
      },
      AuthController.login,
      this.errorHandler,
    );

    return router;
  }

  static async register(router: Router, options: SessionOptions) {
    router.post(
      '/register',
      [
        validate(register),
        async (req: RequestType, res: Response, next: NextFunction) => {
          try {
            passport.authenticate(
              'register',
              options,
              (
                err: Error,
                user: UserInterface | false,
                info: { message: string },
              ) => {
                if (err) {
                  return next(err);
                }
                if (!user) {
                  return res.status(401).json({ message: info.message });
                }

                const payload: PayloadToken = {
                  username: user.username,
                  role: user.role,
                };
                const token = createToken(payload);

                req.token = token;

                req.user = user;
                next();
              },
            )(req, res, next);
          } catch (error) {
            return next(error);
          }
        },
      ],
      AuthController.register,
      this.errorHandler,
    );

    return router;
  }

  static async verifyToken(router: Router) {
    router.get(
      '/verify',
      [isUserMid],
      AuthController.verify,
      this.errorHandler,
    );

    return router;
  }

  static errorHandler(error: ErrorType, req: Request, res: Response) {
    return res.status(error.statusCode || 400).json({
      statusCode: error.statusCode || 400,
      message: error.message,
    });
  }
}
