const db = {
  User: {
    create: jest.fn(),
    findOne: jest.fn()
  }
};

module.exports = db;
