import Joi from 'joi';

const objectId = (value: string, helpers: Joi.CustomHelpers<any>) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.error('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value: string, helpers: Joi.CustomHelpers<any>) => {
  if (value.length < 8) {
    return helpers.error('La contraseña debe tener al menos 8 caracteres');
  }

  if (!/[A-Z]/.test(value)) {
    return helpers.error(
      'La contraseña debe contener al menos una letra mayúscula',
    );
  }
  if (!/[a-z]/.test(value)) {
    return helpers.error(
      'La contraseña debe contener al menos una letra minúscula',
    );
  }
  if (!/[0-9]/.test(value)) {
    return helpers.error('La contraseña debe contener al menos un número');
  }
  if (!/[!@#$%^&*]/.test(value)) {
    return helpers.error(
      'La contraseña debe contener al menos un carácter especial',
    );
  }
  return value;
};

export { password, objectId };
