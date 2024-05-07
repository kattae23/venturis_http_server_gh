import { Router, Request } from 'express';
import { Schema } from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';

export interface PayloadToken {
  username: string;
  role: number;
}

export interface HttpsOptions {
  key: string;
  cert: string;
}

export interface Options {
  port: number;
  routes: Router;
  public_path?: string;
  httpsOptions?: HttpsOptions;
}

export interface ErrorType extends Error {
  statusCode?: number;
}

export interface SessionOptions {
  session: boolean;
  failWithError: boolean;
}

export interface RequestType extends Request {
  token?: string;
}

export type Payload = Partial<JwtPayload> & PayloadToken;

export type AnyObject = Record<string, any>;

export interface ValidSchema {
  params?: Schema;
  query?: Schema;
  body?: Schema;
}

export type RequestWithValidation = Request & { [key: string]: any };

export type UserInterface = Document<
  unknown,
  object,
  {
    createdAt: NativeDate;
    updatedAt: NativeDate;
  } & {
    username: string;
    email: string;
    password: string;
    character: string;
    role: number;
    credits: number;
  }
> & {
  createdAt: NativeDate;
  updatedAt: NativeDate;
} & {
  username: string;
  email: string;
  password: string;
  character: string;
  role: number;
  credits: number;
};
