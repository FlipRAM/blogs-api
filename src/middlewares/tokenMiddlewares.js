const jwt = require('jsonwebtoken');
const { NOT_AUTH } = require('../helpers/httpStatus');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(NOT_AUTH).json({ message: 'Token not found' });

  try {
    jwt.verify(token, secret);
  } catch (err) {
    return res.status(NOT_AUTH).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = { checkToken };
