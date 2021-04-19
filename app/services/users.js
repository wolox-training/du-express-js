const { User } = require('../models');
const errors = require('../errors');
const logger = require('../logger');

exports.getUserByEmail = email =>
  User.findOne({
    where: {
      email
    }
  }).catch(error => {
    logger.error(`Error querying user by email: ${JSON.stringify(error)}`);
    throw errors.databaseError('Error querying user by email');
  });

exports.createUser = user =>
  User.create(user).catch(error => {
    logger.error(`Error creating user: ${JSON.stringify(error)}`);
    throw errors.databaseError('Error creating user.');
  });

exports.getUsers = () =>
  User.findAll().catch(error => {
    logger.error(`Error getting users from database: ${JSON.stringify(error)}`);
    throw errors.databaseError('Error getting users');
  });
