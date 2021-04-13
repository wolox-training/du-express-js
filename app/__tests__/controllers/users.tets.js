jest.mock('../../services/users');
jest.mock('../../helpers');
const helpers = require('../../helpers');
const usersService = require('../../services/users');
const usersController = require('../../controllers/users');

describe('Users controller', () => {
  let user = {
    firstName: 'name',
    lastName: 'last name',
    email: 'email@wolox.com',
    password: 'Asdf1234'
  };
  const req = {
    body: user
  };
  const res = {
    json: jest.fn()
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    user = {
      firstName: 'name',
      lastName: 'last name',
      email: 'email@wolox.com',
      password: 'Asdf1234'
    };
  });

  test('should create user with encrypted password when registerUser controller is called', async () => {
    usersService.createUser.mockReturnValue(Promise.resolve({ ...user, dataValues: { ...user, id: 1 } }));
    usersService.getUserByEmail.mockReturnValue(Promise.resolve([]));
    helpers.encryptPassword.mockReturnValue(Promise.resolve('encrypted password'));
    const expected = {
      ...user,
      id: 1,
      password: undefined
    };
    user.password = 'encrypted password';

    await usersController.registerUser(req, res, next);

    expect(usersService.createUser).toHaveBeenCalledWith(user);
    expect(usersService.getUserByEmail).toHaveBeenCalledWith(user.email);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
});
