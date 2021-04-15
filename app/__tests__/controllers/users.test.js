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
});
