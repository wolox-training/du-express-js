const geekJokeService = require('../services/geek_joke.service');

const postNewWeet = async (req, res, next) => {
  try {
    const response = await geekJokeService.getRandomJoke();
    res.json({ weet: response.data.joke });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postNewWeet
};
