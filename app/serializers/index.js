const userResponse = user => ({
  ...user,
  password: undefined
});

module.exports = {
  userResponse
};
