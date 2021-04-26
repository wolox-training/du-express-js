const request = require('supertest');
const app = require('../../../app');

describe('Users controller', () => {
  let user = {
    first_name: 'name',
    last_name: 'last name',
    email: 'email@wolox.com',
    password: 'Asdf1234'
  };

  beforeEach(() => {
    user = {
      first_name: 'name',
      last_name: 'last name',
      email: 'email@wolox.com',
      password: 'Asdf1234'
    };
  });

  test('should create user with encrypted password when registerUser controller is called', async () => {
    const expected = {
      id: 1,
      first_name: 'name',
      last_name: 'last name',
      email: 'email@wolox.com'
    };

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toEqual(expected);
    expect(response.status).toBe(200);
  });

  test('should return required field error when request body have incomplete fields', async () => {
    delete user.last_name;
    const error = {
      message: "the field 'last_name' is required",
      internal_code: 'input_data_error'
    };

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toEqual(error);
    expect(response.status).toBe(400);
  });

  test('should return invalid format password error when request body have invalid password', async () => {
    user.password = 'invalid password';
    const error = {
      message:
        'password must contain a lowercase letter, a uppercase letter, a number and 8 characters minimum',
      internal_code: 'input_data_error'
    };

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toEqual(error);
    expect(response.status).toBe(400);
  });

  test('should return wolox domain email error when request have invalid email', async () => {
    user.email = 'invalid@email.com';
    const error = {
      message: 'email must be from Wolox domain',
      internal_code: 'input_data_error'
    };

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toEqual(error);
    expect(response.status).toBe(400);
  });

  test('should return existing user error when request have an existing user', async () => {
    const error = {
      message: 'Already exist an user with this email: email@wolox.com',
      internal_code: 'input_data_error'
    };
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toEqual(error);
    expect(response.status).toBe(400);
  });

  test('should return token when user log in with correct credentials', async () => {
    const credentials = {
      email: 'email@wolox.com',
      password: 'Asdf1234'
    };
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users/sessions')
      .send(credentials);

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(200);
  });

  test('should return user email or password error when user sends invalid password', async () => {
    const error = {
      internal_code: 'unauthorized',
      message: 'User email or password are wrong'
    };
    const credentials = {
      email: 'email@wolox.com',
      password: 'invalid password'
    };
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users/sessions')
      .send(credentials);

    expect(response.body).toEqual(error);
    expect(response.status).toBe(401);
  });

  test('should return user email or password error when user sends invalid email', async () => {
    const error = {
      internal_code: 'unauthorized',
      message: 'User email or password are wrong'
    };
    const credentials = {
      email: 'notExisting@wolox.com',
      password: 'Asdf1234'
    };

    const response = await request(app)
      .post('/users/sessions')
      .send(credentials);

    expect(response.body).toEqual(error);
    expect(response.status).toBe(401);
  });

  test('should return invalid email domain error when user send an email of other domains', async () => {
    const error = {
      internal_code: 'input_data_error',
      message: 'email must be from Wolox domain'
    };
    const credentials = {
      email: 'email@invalid.com',
      password: 'Asdf1234'
    };

    const response = await request(app)
      .post('/users/sessions')
      .send(credentials);

    expect(response.body).toEqual(error);
    expect(response.status).toBe(400);
  });

  test('should return users when users endpoint is called', async () => {
    const usersResponse = {
      users: [
        {
          id: 1,
          first_name: 'name',
          last_name: 'last name',
          email: 'email@wolox.com'
        }
      ]
    };
    const credentials = {
      email: 'email@wolox.com',
      password: 'Asdf1234'
    };
    await request(app)
      .post('/users')
      .send(user);
    const authenticate = await request(app)
      .post('/users/sessions')
      .send(credentials);
    const { token } = authenticate.body;

    const response = await request(app)
      .get('/users')
      .set({ Authorization: `Bearer ${token}` })
      .query({ page: 1, size: 1 });

    expect(response.body).toEqual(usersResponse);
  });

  test('should return unauthorized error when request has not token', async () => {
    const error = {
      internal_code: 'unauthorized',
      message: 'Invalid token.'
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
    const credentials = {
      email: 'email@wolox.com',
      password: 'Asdf1234'
    };
    await request(app)
      .post('/users')
      .send(user);
    const authenticate = await request(app)
      .post('/users/sessions')
      .send(credentials);
    const { token } = authenticate.body;

    const response = await request(app)
      .get('/users')
      .set({ Authorization: `Bearer ${token}` })
      .query({ page: 1 });

    expect(response.body).toEqual(error);
  });
});
