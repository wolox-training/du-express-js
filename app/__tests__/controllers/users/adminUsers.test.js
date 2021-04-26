const request = require('supertest');
const app = require('../../../../app');

describe('Create admin user', () => {
  let user = {
    first_name: 'name',
    last_name: 'last name',
    email: 'email@wolox.com',
    password: 'Asdf1234'
  };
  let token = undefined;
  const createToken = async () => {
    const credentials = {
      email: 'test@wolox.co',
      password: 'test'
    };
    const authenticate = await request(app)
      .post('/users/sessions')
      .send(credentials);
    return authenticate.body.token;
  };

  beforeEach(async () => {
    user = {
      first_name: 'name',
      last_name: 'last name',
      email: 'email@wolox.com',
      password: 'Asdf1234'
    };
    token = await createToken();
  });

  test('should create an admin user when request has admin token', async () => {
    const responseExpected = {
      id: 2,
      first_name: 'name',
      last_name: 'last name',
      is_admin: true,
      email: 'email@wolox.com'
    };

    const response = await request(app)
      .post('/admin/users')
      .set({ Authorization: `Bearer ${token}` })
      .send(user);

    expect(response.body).toEqual(responseExpected);
    expect(response.status).toBe(200);
  });

  test('should upgrade a normal user when request has an existing regular user', async () => {
    const responseExpected = {
      id: 2,
      first_name: 'name',
      last_name: 'last name',
      is_admin: true,
      email: 'email@wolox.com'
    };
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/admin/users')
      .set({ Authorization: `Bearer ${token}` })
      .send(user);

    expect(response.body).toEqual(responseExpected);
    expect(response.status).toBe(200);
  });

  test('should return already user admin error when request has an existing admin user', async () => {
    const error = {
      message: "user with email 'test@wolox.co' is already admin",
      internal_code: 'input_data_error'
    };
    user = {
      first_name: 'admin',
      last_name: 'test',
      email: 'test@wolox.co',
      password: 'Asdf1234'
    };
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/admin/users')
      .set({ Authorization: `Bearer ${token}` })
      .send(user);

    expect(response.body).toEqual(error);
    expect(response.status).toBe(400);
  });

  test('should return unauthorized error when request has a token of regular user', async () => {
    const error = {
      message: 'Invalid token',
      internal_code: 'unauthorized'
    };
    const credentials = {
      email: user.email,
      password: user.password
    };
    const authenticate = await request(app)
      .post('/users/sessions')
      .send(credentials);
    const { regularToken } = authenticate.body;
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/admin/users')
      .set({ Authorization: `Bearer ${regularToken}` })
      .send(user);

    expect(response.body).toEqual(error);
    expect(response.status).toBe(401);
  });
});
