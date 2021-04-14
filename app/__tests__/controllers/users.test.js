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
    body: {
      first_name: 'name',
      last_name: 'last name',
      email: 'email@wolox.com',
      password: 'Asdf1234'
    }
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
    usersService.getUserByEmail.mockReturnValue(Promise.resolve(undefined));
    helpers.encryptPassword.mockReturnValue(Promise.resolve('encrypted password'));
    const expected = {
      first_name: 'name',
      last_name: 'last name',
      email: 'email@wolox.com',
      id: 1
    };
    user.password = 'encrypted password';

    await usersController.registerUser(req, res, next);

    expect(usersService.createUser).toHaveBeenCalledWith(user);
    expect(usersService.getUserByEmail).toHaveBeenCalledWith(user.email);
    expect(res.json).toHaveBeenCalledWith(expected);
  });

  test('should return existing user error when controller is called and exist an user with same email', async () => {
    usersService.getUserByEmail.mockReturnValue(Promise.resolve(user));
    const error = {
      message: 'Already exist an user with this email: email@wolox.com',
      internalCode: 'input_data_error'
    };

    await usersController.registerUser(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });

  test('should return database error when controller is called and database fails', async () => {
    const error = {
      message: 'Error creating user.',
      internalCode: 'database_error'
    };
    usersService.getUserByEmail.mockReturnValue(Promise.resolve(undefined));
    usersService.createUser.mockReturnValue(Promise.reject(error));

    await usersController.registerUser(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});
