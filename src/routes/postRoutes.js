const express = require('express');

const router = express.Router();

const postControl = require('../controllers/postControllers');
const postMid = require('../middlewares/postMiddlewares');
const tokenMid = require('../middlewares/tokenMiddlewares');

router.get('/search', tokenMid.checkToken, postControl.getByContent);

router.post('/', tokenMid.checkToken, postMid.checkData, postControl.createPost);

router.get('/', tokenMid.checkToken, postControl.getPosts);

router.get('/:id', tokenMid.checkToken, postControl.getPostById);

router.put('/:id', tokenMid.checkToken, postControl.updateById);

router.delete('/:id', tokenMid.checkToken, postControl.deleteById);

module.exports = router;