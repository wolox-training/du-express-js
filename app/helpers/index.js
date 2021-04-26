const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const config = require('../../config');

exports.encryptPassword = password => bcrypt.hash(password, 10);

exports.validatePassword = (password, hash) => bcrypt.compare(password, hash);

exports.createToken = data => jwt.encode(data, config.common.session.secret);

exports.verifyToken = token => jwt.decode(token, config.common.session.secret);
