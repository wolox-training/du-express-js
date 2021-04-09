<<<<<<< HEAD
const errors = require('../errors');
const logger = require('../logger');
const { encryptPassword } = require('../helpers');
const userService = require('../services/users');
const { userResponse } = require('../serializers');
=======
const models = require('../models');
const errors = require('../errors');
>>>>>>> db899ebc4404eaf8ba2fa080fc4bf4c94655871a

const registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
<<<<<<< HEAD
    const userExists = await userService.getUserByEmail(userData.email);
    if (userExists.length > 0) {
      throw errors.input_data_error(`Already exist an user with this email: ${userData.email}`);
    }
    userData.password = await encryptPassword(userData.password);
    const user = await userService.createUser(userData);
    logger.info(`User '${user.firstName}' has been created successfully.`);
    res.json(userResponse(user.dataValues));
=======
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
>>>>>>> db899ebc4404eaf8ba2fa080fc4bf4c94655871a
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser
};
