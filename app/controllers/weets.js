const weetsService = require('../services/weets');
const geekJokesService = require('../services/geek_jokes');
const { verifyToken } = require('../helpers');
const { serializeWeet } = require('../serializers');

exports.createWeet = async (req, res, next) => {
  try {
    const token = req.get('authorization').split(' ')[1];
    const { id } = verifyToken(token);
    const { joke } = await geekJokesService.getRandomJoke();
    const weet = {
      content: joke.substring(0, 141),
      userId: id
    };
    const weetResponse = await weetsService.createWeet(weet);
    res.json(serializeWeet(weetResponse));
  } catch (error) {
    next(error);
  }
};
