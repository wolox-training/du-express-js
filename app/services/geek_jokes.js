const axios = require('axios');
const config = require('../../config');
const logger = require('../logger');
const errors = require('../errors');

const getRandomJoke = () => {
  const options = {
    params: {
      format: 'json'
    }
  };
  logger.info('Getting random joke...');
  return axios.default
    .get(config.common.geek_joke_api.url, options)
    .then(response => response.data)
    .catch(() => {
      logger.error('Error getting random joke');
      throw errors.external_api_error('Error getting random joke');
    });
};

module.exports = {
  getRandomJoke
};
