const request = require('supertest');
const app = require('../../../../app');

describe('Post weets', () => {
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
    token = await createToken();
  });

  test('should create a new weet when post weets endpoint is called', async () => {
    const response = await request(app)
      .post('/weets')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.body).toHaveProperty('content');
    expect(response.body.user_id).toBe(1);
    expect(response.status).toBe(200);
  });

  test('should return unauthorized error when request has not valid token', async () => {
    const error = {
      message: 'Invalid token',
      internal_code: 'unauthorized'
    };
    const response = await request(app).post('/weets');

    expect(response.body).toEqual(error);
    expect(response.status).toBe(401);
  });
});
