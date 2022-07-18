const { NOT_FORMAT } = require('../helpers/httpStatus');

const checkLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(NOT_FORMAT).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = { checkLogin };