const { User } = require('../database/models');
const jwtValidation = require('../auth/jwtValidation');

const findOne = async (email, password) => {
  const match = await User.findOne({ where: { email, password } });

  if (!match) return null;

  const token = jwtValidation.makeToken(email, password);
  return { token };
};

module.exports = { findOne };