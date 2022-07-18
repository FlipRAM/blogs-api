const { NOT_FORMAT } = require('../helpers/httpStatus');

const checkData = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(NOT_FORMAT).json({
      message: '"name" is required',
    });
  }

  next();
};

module.exports = { checkData };