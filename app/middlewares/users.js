const { userSchema, loginSchema, paginationSchema } = require('./schemas/users');
const errors = require('../errors');
const { verifyToken } = require('../helpers');

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

exports.validateAuthorization = (req, res, next) => {
  try {
    const token = req.get('authorization').split(' ')[1];
    verifyToken(token);
    next();
  } catch (error) {
    next(errors.unauthorized_error('Invalid token.'));
  }
};

exports.validatePagination = (req, res, next) => {
  try {
    const { error } = paginationSchema.validate(req.query);
    if (error) {
      next(errors.input_data_error(error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
};
