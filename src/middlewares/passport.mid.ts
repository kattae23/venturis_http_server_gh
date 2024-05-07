import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { createToken } from '../utils/token.util';
import { SchemaDefinition } from 'mongoose';
import User from '../domain/models/user.model';
import { PayloadToken, RequestType } from '../utils/interfaces';
import { GameService } from '../presentation/game/service';
import { Request, Response } from 'express';

passport.use(
  'register',
  new LocalStrategy(
    { passReqToCallback: true },
    async (
      req: Request,
      username: string,
      password: string,
      done: (error: Error | null, user?: SchemaDefinition<typeof User>) => void,
    ) => {
      try {
        const { email, character } = req.body;
        const newUser = await GameService.createUser(
          username,
          email,
          password,
          character,
          req.res || ({} as Response<any, Record<string, any>>),
        );
        return done(null, newUser);
      } catch (error) {
        if (error instanceof Error) return done(error);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    { passReqToCallback: true },
    async (req: RequestType, username, password, done) => {
      try {
        const user = await GameService.validateUser(username, password);

        if (!user)
          return done(null, false, { message: 'Usuario no encontrado' });

        const payload: PayloadToken = {
          username: user.username,
          role: user.role,
        };

        const token = createToken(payload);
        req.token = token;

        return done(null, user);
      } catch (error) {
        if (error instanceof Error) return done(error);
      }
    },
  ),
);

export default passport;
