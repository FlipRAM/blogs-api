const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, Category, User } = require('../database/models');
require('dotenv').config();

const findUserId = async (email) => {
  const { dataValues: { id } } = await User.findOne({ where: { email }, attributes: ['id'] });

  return id;
};

const createBlogPost = async (token, objToAdd) => {
  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  const userId = await findUserId(data);
  const post = await BlogPost.create({ userId, title: objToAdd.title, content: objToAdd.content });
  
  const validList = await Category.findAll({ where: { id: objToAdd.categoryIds } });
  if (validList.length === 0) return null;

  await PostCategory.bulkCreate(validList.map(({ dataValues: { id } }) => (
    { postId: post.id, categoryId: id }
  )));

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    userId,
    updated: post.updatedAt,
    published: post.publishedAt,
  };
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  return posts;
};

module.exports = { createBlogPost, getPosts };