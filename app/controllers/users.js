const errors = require('../errors');
const logger = require('../logger');
const { encryptPassword } = require('../helpers');
const userService = require('../services/users');
const { serializeUser } = require('../serializers');
const { mapperUser } = require('../mappers');

exports.registerUser = async (req, res, next) => {
  try {
    const userData = mapperUser(req.body);
    const userExists = await userService.getUserByEmail(userData.email);
    if (userExists) {
      throw errors.input_data_error(`Already exist an user with this email: ${userData.email}`);
    }
    userData.password = await encryptPassword(userData.password);
    const user = await userService.createUser(userData);
    logger.info(`User '${user.firstName}' has been created successfully.`);
    res.json(serializeUser(user.dataValues));
  } catch (error) {
    next(error);
  }
};
