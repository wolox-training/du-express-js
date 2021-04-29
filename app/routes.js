const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');
const weetController = require('./controllers/weets');
const userMiddlewares = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', userMiddlewares.validateUserModel, userController.registerUser);
  app.post('/users/sessions', userMiddlewares.validateCredentialsFormat, userController.login);
  app.get(
    '/users',
    userMiddlewares.validateAuthorization(),
    userMiddlewares.validatePagination,
    userController.getUsers
  );
  app.post(
    '/admin/users',
    userMiddlewares.validateAuthorization(true),
    userMiddlewares.validateUserModel,
    userController.createAdminUser
  );
  app.post('/weets', userMiddlewares.validateAuthorization(), weetController.createWeet);
  app.get(
    '/weets',
    userMiddlewares.validateAuthorization(),
    userMiddlewares.validatePagination,
    weetController.getWeets
  );
};
