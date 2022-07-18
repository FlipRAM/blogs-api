const { NOT_FORMAT } = require('../helpers/httpStatus');

const checkData = (req, res, next) => {
  const { displayName, email, password } = req.body;

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (displayName.length < 8) {
    return res.status(NOT_FORMAT).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(NOT_FORMAT).json({ message: '"email" must be a valid email' });
  }
  if (password.length < 6) {
    return res.status(NOT_FORMAT).json({
      message: '"password" length must be at least 6 characters long',
    });
  }

  next();
};

module.exports = { checkData };