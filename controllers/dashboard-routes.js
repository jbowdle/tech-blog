const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const checkLogin = require('../utils/helpers');

router.get('/', checkLogin, async (req, res) => {
  try {
    const currentUser = await User.findOne({
      where: {
        username: req.session.username,
      },
      attributes: ['id'],
    });

    const postData = await Post.findAll({
      where: {
        user_id: currentUser.id,
      },
      include: {
        model: User,
        attributes: ['username'],
      },
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );

    res.render('dashboard', {
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/post', checkLogin, async (req, res) => {
  try {
    const currentUser = await User.findOne({
      where: {
        username: req.session.username,
      },
      attributes: ['id'],
    });

    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: currentUser.id,
    });

    // TODO: send user to newly created post page
    res.status(200).json({newPost: newPost, message: 'post created'});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;