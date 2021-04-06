// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const weets = require('./controllers/weets');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/weet', weets.postNewWeet);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
