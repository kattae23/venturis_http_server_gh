import Joi from 'joi';
import { objectId, password } from './custom.validation';

export const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.number().required(),
    credits: Joi.string(),
    character: Joi.string().required(),
  }),
};

export const updateUser = {
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      role: Joi.string().custom(objectId),
      username: Joi.string(),
      credits: Joi.string(),
      character: Joi.string(),
    })
    .min(1),
};
