const axios = require('axios');
const config = require('../../config');

const getRandomJoke = () => {
  const options = {
    params: {
      format: 'json'
    }
  };
  return axios.default.get(config.common.geek_joke_api.url, options);
};

module.exports = {
  getRandomJoke
};
