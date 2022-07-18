const express = require('express');

const router = express.Router();

const loginControl = require('../controllers/loginControllers');
const loginMid = require('../middlewares/loginMiddlewares');

router.post('/', loginMid.checkLogin, loginControl.login);

module.exports = router;