const { NOT_FORMAT } = require('../helpers/httpStatus');

const checkData = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(NOT_FORMAT).json({
      message: 'Some required fields are missing',
    });
  }

  next();
};

module.exports = { checkData };