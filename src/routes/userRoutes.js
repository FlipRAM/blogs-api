const express = require('express');

const router = express.Router();

const userControl = require('../controllers/userControllers');
const userMid = require('../middlewares/userMiddlewares');
const tokenMid = require('../middlewares/tokenMiddlewares');

router.post('/', userMid.checkData, userControl.createUser);

router.get('/', tokenMid.checkToken, userControl.getUsers);

router.get('/:id', tokenMid.checkToken, userControl.getUserById);

module.exports = router;