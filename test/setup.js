const models = require('../app/models');
const { encryptPassword } = require('../app/helpers');

const adminTest = {
  firstName: 'admin',
  lastName: 'test',
  email: 'test@wolox.co',
  isAdmin: true
};

const tables = Object.values(models.sequelize.models);

const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = () => Promise.all(tables.map(truncateTable));

global.beforeEach(async () => {
  await truncateDatabase();
  adminTest.password = await encryptPassword('test');
  await models.User.create(adminTest);
});

global.afterAll(async () => {
  await truncateDatabase();
});
