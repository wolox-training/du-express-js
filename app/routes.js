const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');
const userMiddlewares = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', userMiddlewares.validateUserModel, userController.registerUser);
  app.post('/users/sessions', userMiddlewares.validateCredentialsFormat, userController.login);
  app.get(
    '/users',
    userMiddlewares.validateAuthorization,
    userMiddlewares.validatePagination,
    userController.getUsers
  );
};
