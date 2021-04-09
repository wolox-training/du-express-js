const { User } = require('../models');
const errors = require('../errors');

const getUserByEmail = email => {
  try {
    return User.findAll({
      where: {
        email
      }
    });
  } catch {
    throw errors.databaseError('Error querying users by email');
  }
};

const createUser = user => {
  try {
    return User.create(user);
  } catch {
    throw errors.databaseError('Error creating user.');
  }
};

module.exports = {
  getUserByEmail,
  createUser
};
