const { userSchema, loginSchema, paginationSchema } = require('./schemas/users');
const errors = require('../errors');
const { verifyToken } = require('../helpers');
const { mapperUser } = require('../mappers');

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

exports.validateAuthorization = adminValidation => (req, res, next) => {
  try {
    const token = req.get('authorization').split(' ')[1];
    const user = mapperUser(verifyToken(token));
    const isAuthorized = (adminValidation && user.isAdmin) || !adminValidation;
    if (isAuthorized) {
      next();
      return;
    }
    next(errors.unauthorized_error('User not authorized to perform this action'));
  } catch (error) {
    next(errors.unauthorized_error('Invalid token'));
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
