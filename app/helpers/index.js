const bcrypt = require('bcryptjs');

const saltRounds = 10;

const encryptPassword = password => bcrypt.hash(password, saltRounds);

module.exports = {
  encryptPassword
};
