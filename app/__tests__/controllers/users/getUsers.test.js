const request = require('supertest');
const app = require('../../../../app');

describe('Get users', () => {
  let user = {
    first_name: 'name',
    last_name: 'last name',
    email: 'email@wolox.com',
    password: 'Asdf1234'
  };
  const createToken = async () => {
    const credentials = {
      email: 'email@wolox.com',
      password: 'Asdf1234'
    };
    const authenticate = await request(app)
      .post('/users/sessions')
      .send(credentials);
    return authenticate.body.token;
  };

  beforeEach(() => {
    user = {
      first_name: 'name',
      last_name: 'last name',
      email: 'email@wolox.com',
      password: 'Asdf1234'
    };
  });

  test('should return users when users endpoint is called', async () => {
    const usersResponse = {
      users: [
        {
          id: 1,
          first_name: 'admin',
          last_name: 'test',
          email: 'test@wolox.co',
          is_admin: true
        }
      ]
    };
    await request(app)
      .post('/users')
      .send(user);
    const token = await createToken();

    const response = await request(app)
      .get('/users')
      .set({ Authorization: `Bearer ${token}` })
      .query({ page: 1, size: 1 });

    expect(response.body).toEqual(usersResponse);
  });

  test('should return unauthorized error when request has not token', async () => {
    const error = {
      internal_code: 'unauthorized',
      message: 'Invalid token'
    };
    const response = await request(app)
      .get('/users')
      .query({ page: 1, size: 1 });

    expect(response.body).toEqual(error);
  });

  test('should return required field error when request has not pagination parameters', async () => {
    const error = {
      internal_code: 'input_data_error',
      message: "the field 'size' is required"
    };
    await request(app)
      .post('/users')
      .send(user);
    const token = await createToken();

    const response = await request(app)
      .get('/users')
      .set({ Authorization: `Bearer ${token}` })
      .query({ page: 1 });

    expect(response.body).toEqual(error);
  });
});
