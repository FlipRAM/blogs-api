const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
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

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  if (!post) return null;

  return post;
};

const updateById = async (token, id, title, content) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  const userId = await findUserId(data);

  if (!post) return null;

  if (post.userId !== userId) return { message: 'Unauthorized user' };

  await BlogPost.update({ title, content }, { where: { id } });

  const updated = await getPostById(id);
  
  return updated;
};

const deleteById = async (token, id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  const userId = await findUserId(data);

  if (post.userId !== userId) return { message: 'Unauthorized user' };

  if (!post) return null;

  await BlogPost.destroy({ where: { id } });

  return true;
};

const getByContent = async (query) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: query } },
        { content: { [Op.substring]: query } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  return posts;
};

module.exports = { createBlogPost, getPosts, getPostById, updateById, deleteById, getByContent };