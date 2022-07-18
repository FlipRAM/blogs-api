const express = require('express');

const router = express.Router();

const loginControl = require('../controllers/loginControllers');
const loginMid = require('../middlewares/loginMiddlewares');

// router.get('/login', userControl.getByName);

router.post('/', loginMid.checkLogin, loginControl.login);

// router.put('/products/:id', userMid.checkName, userControl.update);

// router.delete('/products/:id', userControl.deleteProd);

module.exports = router;