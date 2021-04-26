exports.serializeUser = user => ({
  id: user.id,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email,
  is_admin: user.isAdmin
});
