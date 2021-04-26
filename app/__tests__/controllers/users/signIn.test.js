const request = require('supertest');
const app = require('../../../../app');

describe('Sign in', () => {
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
});
