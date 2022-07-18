const { CREATED } = require('../helpers/httpStatus');
const categoryServ = require('../services/categoryServices');

const createCategory = async (req, res, _next) => {
  const { name } = req.body;

  const category = await categoryServ.createCategory(name);

  return res.status(CREATED).json(category);
};

module.exports = { createCategory };