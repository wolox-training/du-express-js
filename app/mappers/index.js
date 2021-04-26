exports.mapperUser = user => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
  password: user.password,
  isAdmin: user.is_admin
});
