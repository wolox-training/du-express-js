exports.serializeUser = user => ({
  id: user.id,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email,
  is_admin: user.isAdmin
});

exports.serializeWeet = weet => ({
  id: weet.id,
  content: weet.content,
  user_id: weet.userId,
  created_at: weet.createdAt,
  updated_at: weet.updatedAt
});
