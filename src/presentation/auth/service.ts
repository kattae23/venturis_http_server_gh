import { NextFunction, Response } from 'express';
import { RequestType } from '../../utils/interfaces';
import { verifytoken } from '../../utils/token.util';
import User from '../../domain/models/user.model';

export class AuthService {
  static login(req: RequestType, res: Response, next: NextFunction) {
    try {
      return res
        .cookie('token', req.token, { maxAge: 60000, httpOnly: true })
        .status(200)
        .json({
          statusCode: 200,
          message: 'Successful login!',
        });
    } catch (error) {
      console.log('Error en el inicio de sesión:', error);
      return next(error);
    }
  }

  static register(req: RequestType, res: Response, next: NextFunction) {
    try {
      return res.status(201).json({
        statusCode: 201,
        message: 'registered',
      });
    } catch (error) {
      return next(error);
    }
  }

  static async verify(req: RequestType, res: Response) {
    try {
      const token = req.cookies.token;
      const decoded = verifytoken(token);
      const user_logged = decoded.username;

      const userDocument = await User.findOne({ username: user_logged });
      if (!userDocument) {
        res.status(404).json({ error: '- Usuario no encontrado' });
        return;
      }
      const character = userDocument.character;

      res.status(200).json({
        message: ' - Token verificado correctamente',
        username: user_logged,
        /*token: randomToken,*/ character: character,
      });
    } catch (err) {
      console.log('Error verificando el token:', err);
      res.status(500).json({ error: '- Error verificando el token' });
    }
  }
}
