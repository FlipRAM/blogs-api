const express = require('express');

const router = express.Router();

const categoryControl = require('../controllers/categoryControllers');
const categoryMid = require('../middlewares/categoryMiddlewares');
const tokenMid = require('../middlewares/tokenMiddlewares');

router.post('/', tokenMid.checkToken, categoryMid.checkData, categoryControl.createCategory);

router.get('/', tokenMid.checkToken, categoryControl.getCategories);

module.exports = router;