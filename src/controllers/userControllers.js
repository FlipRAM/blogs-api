const { OK, CREATED, ALREADY_CREATED, NOT_FOUND, DELETED } = require('../helpers/httpStatus');
const userServ = require('../services/userServices');

const createUser = async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;

  const token = await userServ.createUser(displayName, email, password, image);

  if (!token) return res.status(ALREADY_CREATED).json({ message: 'User already registered' });

  return res.status(CREATED).json(token);
};

const getUsers = async (req, res, _next) => {  
  const users = await userServ.getUsers();

  return res.status(OK).json(users);
};

const getUserById = async (req, res, _next) => {
  const { id } = req.params;
  const user = await userServ.getUserById(id);

  if (!user) return res.status(NOT_FOUND).json({ message: 'User does not exist' });

  return res.status(OK).json(user);
};

const deleteUser = async (req, res, _next) => {
  const { authorization } = req.headers;
  await userServ.deleteUser(authorization);

  return res.status(DELETED).json();
};

module.exports = { createUser, getUsers, getUserById, deleteUser };