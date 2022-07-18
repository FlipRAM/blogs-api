const { CREATED, ALREADY_CREATED } = require('../helpers/httpStatus');
const userServ = require('../services/userServices');

const createUser = async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;

  const token = await userServ.createUser(displayName, email, password, image);

  if (!token) return res.status(ALREADY_CREATED).json({ message: 'User already registered' });

  return res.status(CREATED).json(token);
};

module.exports = { createUser };