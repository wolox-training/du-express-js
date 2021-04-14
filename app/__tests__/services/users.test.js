jest.mock('../../models');
const { User } = require('../../models');
const usersService = require('../../services/users');

describe('Users service', () => {
  const user = {
    id: 1,
    firstName: 'name',
    lastName: 'last name',
    email: 'email@wolox.com',
    password: 'password'
  };

  test('should find an user by email when getUserByEmail is called with user email', async () => {
    User.findOne.mockReturnValue(Promise.resolve(user));
    const query = {
      where: {
        email: 'email'
      }
    };

    const result = await usersService.getUserByEmail('email');

    expect(result).toEqual(user);
    expect(User.findOne).toHaveBeenCalledWith(query);
  });

  test('should throw a database error when query fails', async () => {
    const error = new Error('database error');
    User.findOne.mockReturnValue(Promise.reject(error));
    const expected = {
      message: 'Error querying user by email',
      internalCode: 'database_error'
    };
    try {
      await usersService.getUserByEmail('email');
    } catch (e) {
      expect(e).toEqual(expected);
    }
  });
});
