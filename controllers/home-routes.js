const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: {
        model: User,
        attributes: ['username'],
      },
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );

    // debug
    // res.status(200).json(posts);
    console.log(posts);

    // code to be used once views are created:
    res.render('homepage', {
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: [
            'content',
            'createdAt',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    // debug
    // res.status(200).json(post);
    console.log(post);

    res.render('post', {
      post,
    });

    // code to be used once views are created goes here:
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;