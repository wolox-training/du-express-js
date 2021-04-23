const { Weet } = require('../models');
const errors = require('../errors');
const logger = require('../logger');

exports.createWeet = weet =>
  Weet.create(weet).catch(error => {
    logger.error(`Error creating weet: ${JSON.stringify(error)}`);
    throw errors.databaseError('Error creating weet');
  });
