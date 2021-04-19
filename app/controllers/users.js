const errors = require('../errors');
const logger = require('../logger');
const { encryptPassword, validatePassword, createToken } = require('../helpers');
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

exports.login = async (req, res, next) => {
  try {
    const credentials = req.body;
    const user = await userService.getUserByEmail(credentials.email);
    const isValidCredential = user && (await validatePassword(credentials.password, user.password));
    if (!isValidCredential) {
      throw errors.unauthorized_error('User email or password are wrong');
    }
    const token = createToken(serializeUser(user));
    logger.info(`user with email ${user.email} has logged in successfully`);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    let users = await userService.getUsers();
    if (users.length > 0) {
      users = users.map(user => serializeUser(user.dataValues));
    }
    res.json({ users });
  } catch (error) {
    next(error);
  }
};
