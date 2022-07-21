const { OK, CREATED, NOT_FORMAT, NOT_FOUND } = require('../helpers/httpStatus');
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

const getPostById = async (req, res, _next) => {
  const { id } = req.params;
  const post = await postServ.getPostById(id);

  if (!post) return res.status(NOT_FOUND).json({ message: 'Post does not exist' });

  return res.status(OK).json(post);
};

module.exports = { createPost, getPosts, getPostById };