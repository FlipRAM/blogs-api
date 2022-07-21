const { OK, CREATED, NOT_FORMAT } = require('../helpers/httpStatus');
const postServ = require('../services/postServices');

const createPost = async (req, res, _next) => {
  const { authorization } = req.headers;

  const post = await postServ.createBlogPost(authorization, req.body);

  if (!post) return res.status(NOT_FORMAT).json({ message: '"categoryIds" not found' });

  return res.status(CREATED).json(post);
};

const getPosts = async (req, res, _next) => {
  const posts = await postServ.getPosts();

  return res.status(OK).json(posts);
};

module.exports = { createPost, getPosts };