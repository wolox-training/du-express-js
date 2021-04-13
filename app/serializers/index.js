exports.serializeUserOutput = user => ({
  id: user.id,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email
});

exports.serializeUserInput = user => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
  password: user.password
});
