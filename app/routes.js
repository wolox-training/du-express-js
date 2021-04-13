const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');
const { validateUserModel } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateUserModel, userController.registerUser);
};
