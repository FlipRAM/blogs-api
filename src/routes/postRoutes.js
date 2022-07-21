const express = require('express');

const router = express.Router();

const postControl = require('../controllers/postControllers');
const postMid = require('../middlewares/postMiddlewares');
const tokenMid = require('../middlewares/tokenMiddlewares');

router.post('/', tokenMid.checkToken, postMid.checkData, postControl.createPost);
router.get('/', tokenMid.checkToken, postControl.getPosts);

module.exports = router;