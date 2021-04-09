const userSchema = require('./schemas/users');
const errors = require('../errors');

const validateUserModel = (req, res, next) => {
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

module.exports = {
  validateUserModel
};
