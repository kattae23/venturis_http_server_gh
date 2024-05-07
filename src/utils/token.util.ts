import jwt from 'jsonwebtoken';
import { PayloadToken, type Payload } from './interfaces';
import envs from '../config/envs';
import { Response } from 'express';

function createToken(data: PayloadToken) {
  const token = jwt.sign(data, envs.JWT_SECRET, {
    expiresIn: '60h',
  });
  return token;
}

function verifytoken(token: string, res: Response): Payload | any {
  if (token) {
    try {
      const data = jwt.verify(token, envs.JWT_SECRET);
      return data as Payload;
    } catch (error) {
      return res.json(400).json({ message: 'Invalid token' });
    }
  }
  return res.status(400).json({ message: 'bad auth token' });
}

export { createToken, verifytoken };
