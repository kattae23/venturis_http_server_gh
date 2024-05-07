import { NextFunction, Response } from 'express';
import User from '../../domain/models/user.model';
import { createHash, verifyHash } from '../../utils/bcrypt.utils';
import { RequestType, UserInterface } from '../../utils/interfaces';
import { verifytoken } from '../../utils/token.util';

export class GameService {
  static async createUser(
    username: string,
    email: string,
    password: string,
    character: string,
    res: Response,
  ) {
    const userExists = await User.findOne({ username: username });
    if (userExists) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    }

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.status(400).json({ error: 'El correo electrónico ya existe' });
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
      const decoded = verifytoken(token, res);
      const user_logged = decoded.username;

      const userDocument = await User.findOne({ username: user_logged });

      if (!userDocument) {
        res.status(404).json({ error: '- Usuario no encontrado' });
        return;
      }

      const character = userDocument.character;
      res.status(200).json({ character: character });
    } catch (error) {
      return next(error);
    }
  }

  static async getOneByUsernameOrEmail(userDto: UserInterface) {
    const { email, username } = userDto;

    const user = await User.findOne({ username, email });

    if (!user) {
      return null;
    }

    return user;
  }

  static async updateUser(req: RequestType, res: Response) {
    const updateUserDto = req.body;

    const token = req.cookies.token;
    const decoded = verifytoken(token, res);

    const user_logged = decoded.username;

    const keyExist = await this.getOneByUsernameOrEmail(updateUserDto);

    if (keyExist) {
      res
        .status(401)
        .json({ error: '- El usuario o correo ya ha sido tomado' });
      return;
    }

    const hashedPassword = createHash(updateUserDto.password);

    try {
      const updatedUser = await User.findOneAndUpdate(
        { username: user_logged },
        {
          ...updateUserDto,
          password: hashedPassword,
        },
        { new: true },
      );

      if (!updatedUser) {
        res.status(404).json({ error: '- Usuario no encontrado' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: '- Error actualizando el personaje' });
      return;
    }
  }

  static async validateUser(
    username: string,
    password: string,
  ): Promise<UserInterface | null> {
    const user = await User.findOne({ username: username });

    if (!user) {
      return null;
    }

    if (!verifyHash(password, user.password)) {
      return null;
    }

    return user;
  }
}
