const { OK, CREATED, NOT_FORMAT, NOT_FOUND, NOT_AUTH, DELETED } = require('../helpers/httpStatus');
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

const updateById = async (req, res, _next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { title, content } = req.body;

  const post = await postServ.updateById(authorization, id, title, content);
  
  if (!title || !content) {
    return res.status(NOT_FORMAT).json({ message: 'Some required fields are missing' });
  }

  if (post.message) return res.status(NOT_AUTH).json(post);

  return res.status(OK).json(post);
};

const deleteById = async (req, res, _next) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const post = await postServ.updateById(authorization, id);
  
  if (!post) return res.status(NOT_FOUND).json({ message: 'Post does not exist' });

  if (post.message) return res.status(NOT_AUTH).json(post);

  if (post) return res.status(DELETED).json();
};

const getByContent = async (req, res, _next) => {
  const { q } = req.query;

  let posts = [];
  
  if (!q) {
    posts = await postServ.getPosts();
  }

  if (q) {
    posts = await postServ.getByContent(q);
  }

  return res.status(OK).json(posts);
};

module.exports = { createPost, getPosts, getPostById, updateById, deleteById, getByContent };