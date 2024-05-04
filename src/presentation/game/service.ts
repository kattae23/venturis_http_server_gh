import { NextFunction, Response } from 'express';
import User from '../../domain/models/user.model';
import { createHash, verifyHash } from '../../utils/bcrypt.utils';
import { RequestType } from '../../utils/interfaces';
import { verifytoken } from '../../utils/token.util';

export class GameService {
  static async createUser(
    username: string,
    email: string,
    password: string,
    character: string,
  ) {
    const userExists = await User.findOne({ username: username });
    if (userExists) {
      throw new Error('El nombre de usuario ya existe');
    }

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      throw new Error('El correo electrónico ya existe');
    }

    const hashedPassword = createHash(password);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      character,
    });
    await newUser.save();
    return newUser;
  }

  static async getCharacter(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
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
      res.status(200).json({ character: character });
    } catch (error) {
      console.log('- Error al obtener el perfil del usuario:', error);
      return next(error);
    }
  }

  static async updateUser(req: RequestType, res: Response) {
    const receivedData = req.body;

    const token = req.cookies.token;
    const decoded = verifytoken(token);
    const user_logged = decoded.username;
    const character = receivedData.character;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { username: user_logged },
        { character: character },
        { new: true },
      );

      if (!updatedUser) {
        res.status(404).json({ error: '- Usuario no encontrado' });
        return;
      }

      res.status(200).json({ character: character });
    } catch (err) {
      console.log('- Error actualizando el personaje:', err);
      res.status(500).json({ error: '- Error actualizando el personaje' });
    }
  }

  static async validateUser(username: string, password: string) {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    if (!verifyHash(password, user.password)) {
      throw new Error('Contraseña incorrecta');
    }
    return user;
  }
}
