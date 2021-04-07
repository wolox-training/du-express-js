const axios = require('axios');
const config = require('../../config');

const getRandomJoke = async () => {
  const options = {
    params: {
      format: 'json'
    }
  };
  console.info('Getting random joke...');
  return axios.default.get(config.common.geek_joke_api.url, options)
    .then(response => response.data);
};

module.exports = {
  getRandomJoke
};
