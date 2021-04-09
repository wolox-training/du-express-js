const models = require('../models');
const errors = require('../errors');

const registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const userExists = await models.user.findAll({
      where: {
        email: userData.email
      }
    });
    if (userExists) {
      next(errors.input_data_error(`Already exist an user with this email: ${userData.email}`));
      return;
    }
    const user = await models.user.create(userData);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser
};
