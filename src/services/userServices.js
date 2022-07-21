const jwt = require('jsonwebtoken');
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

const getUserById = async (id) => {
  const user = await User.findOne(
    { where: { id },
    attributes: ['id', 'displayName', 'email', 'image'] },
  );

  return user;
};

const findUserId = async (email) => {
  const { dataValues: { id } } = await User.findOne({ where: { email }, attributes: ['id'] });

  return id;
};

const deleteUser = async (token) => {
  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  const id = await findUserId(data);

  await User.destroy({ where: { id } });

  return true;
};

module.exports = { createUser, getUsers, getUserById, deleteUser };