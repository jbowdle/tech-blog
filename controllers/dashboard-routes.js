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
      posts, loggedIn: req.session.loggedIn
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

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/delete', checkLogin, async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.body.postID,
      },
    });

    res.status(200).json({message: "Post deleted"});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;