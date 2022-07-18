const express = require('express');

const router = express.Router();

const userControl = require('../controllers/userControllers');
const userMid = require('../middlewares/userMiddlewares');

router.post('/', userMid.checkData, userControl.createUser);

module.exports = router;