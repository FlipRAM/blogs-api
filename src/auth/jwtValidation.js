require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const makeToken = (email, password) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: email, password }, secret, jwtConfig);

  return token;
};

module.exports = { makeToken };