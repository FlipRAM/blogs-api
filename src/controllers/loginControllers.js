const { OK, NOT_FORMAT } = require('../helpers/httpStatus');
const loginServ = require('../services/loginServices');

const login = async (req, res, _next) => {
  const { email, password } = req.body;
  const token = await loginServ.findOne(email, password);

  if (!token) return res.status(NOT_FORMAT).json({ message: 'Invalid fields' });

  return res.status(OK).json(token);
};

module.exports = { login };