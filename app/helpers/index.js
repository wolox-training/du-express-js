const bcrypt = require('bcryptjs');

exports.encryptPassword = password => bcrypt.hash(password, 10);
