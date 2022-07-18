const { User } = require('../database/models');
const jwtValidation = require('../auth/jwtValidation');

const createUser = async (displayName, email, password, image) => {
  const match = await User.findOne({ where: { email } });

  if (match) return null;

  const user = await User.create({ displayName, email, password, image });
  const token = jwtValidation.makeToken(user.email, user.password);

  return { token };
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return users;
};

module.exports = { createUser, getUsers };