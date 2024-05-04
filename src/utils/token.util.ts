import jwt from 'jsonwebtoken';
import { PayloadToken, type ErrorType, type Payload } from './interfaces';
import envs from '../config/envs';

function createToken(data: PayloadToken) {
  const token = jwt.sign(data, envs.JWT_SECRET, {
    expiresIn: 60,
  });
  return token;
}

function verifytoken(token: string): Payload {
  if (token) {
    try {
      const data = jwt.verify(token, envs.JWT_SECRET);
      return data as Payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
  const error: ErrorType = new Error('bad auth token');
  error.statusCode = 401;
  throw error;
}

export { createToken, verifytoken };
