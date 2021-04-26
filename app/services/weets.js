const { Weet } = require('../models');
const errors = require('../errors');
const logger = require('../logger');

exports.createWeet = weet =>
  Weet.create(weet).catch(error => {
    logger.error(`Error creating weet: ${JSON.stringify(error)}`);
    throw errors.databaseError('Error creating weet');
  });

exports.getWeets = ({ page, limit }) =>
  Weet.findAll({
    offset: limit * (page - 1),
    limit
  }).catch(error => {
    logger.error(`Error getting weets: ${JSON.stringify(error)}`);
    throw errors.databaseError('Error getting weets');
  });
