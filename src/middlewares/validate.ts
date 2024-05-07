import { Response, NextFunction } from 'express';
import Joi, { ValidationResult } from 'joi';
import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/api-error';
import { RequestWithValidation, ValidSchema } from '../utils/interfaces';

const validate =
  (schema: ValidSchema) =>
  (req: RequestWithValidation, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema)) as RequestWithValidation;
    const { value, error }: ValidationResult<any> = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details.map((details) => details.message);

      return req.res
        ?.status(400)
        .json(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
