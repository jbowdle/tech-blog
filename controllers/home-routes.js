const router = require('express').Router();
const { Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ['content'],
        },
      ],
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      p2121osts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});