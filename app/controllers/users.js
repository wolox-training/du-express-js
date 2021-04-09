const errors = require('../errors');
const logger = require('../logger');
const { encryptPassword } = require('../helpers');
const userService = require('../services/users');
const { userResponse } = require('../serializers');

const registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const userExists = await userService.getUserByEmail(userData.email);
    if (userExists.length > 0) {
      throw errors.input_data_error(`Already exist an user with this email: ${userData.email}`);
    }
    userData.password = await encryptPassword(userData.password);
    const user = await userService.createUser(userData);
    logger.info(`User '${user.firstName}' has been created successfully.`);
    res.json(userResponse(user.dataValues));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser
};
