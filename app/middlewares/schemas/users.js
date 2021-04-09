const joi = require('joi');

const errorMessages = error => ({
  'any.required': `the field '${error.path[0]}' is required`,
  'string.base': `the field '${error.path[0]}' must be a string'`
});

const user = joi
  .object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi
      .string()
      .pattern(/^([\w.])+@wolox\.(\w)+$/)
      .required()
      .messages({
        'string.pattern.base': 'email must be from Wolox domain'
      }),
    password: joi
      .string()
      .pattern(/^[a-zA-Z0-9]{8,20}$/)
      .required()
      .messages({
        'string.pattern.base':
          'password must contain a lowercase letter, a uppercase letter, a number and 8 characters minimum'
      })
  })
  .required()
  .error(errors =>
    errors.map(error => {
      const messages = errorMessages(error);
      error.message = messages[error.code] || error.message;
      return error;
    })
  );

module.exports = user;
