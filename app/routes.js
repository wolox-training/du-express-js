const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');
const { validateUserModel, validateCredentialsFormat } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateUserModel, userController.registerUser);
  app.post('/users/sessions', validateCredentialsFormat, userController.login);
  app.get('/users', userController.getUsers);
};
