const { userSchema, loginSchema } = require('./schemas/users');
const errors = require('../errors');

exports.validateUserModel = (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      next(errors.input_data_error(error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.validateCredentialsFormat = (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      next(errors.input_data_error(error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
};
