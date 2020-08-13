const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const upload = require('../utils/upload');
const { Post, User, Comment } = require('../models');
const { route } = require('./api');
const qs = require('qs');
const assert = require('assert');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'birthDate',
      'passingDate',
      'content',
      'avatar',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      // use the ID from the session
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'birthDate',
      'passingDate',
      'content',
      'avatar',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    // serialize data before passing to template
    const post = dbPostData.get({ plain: true });
    res.render('edit-post', { post, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// router.post('/', withAuth, upload.single('avatar'), (req, res) => {
//   console.log(req.file)
//   console.log('HERE---------------------------------------')
//   console.log(req.body);
//   console.log('HERE---------------------------------------')
//   console.log(req.post-title);
//   Post.create({
//     title: req.body.post-title,
//     birthDate: req.body.birth-date,
//     passingDate: req.body.passing-date,
//     avatar: `images/${req.file.filename}`,
//     content: req.body.post-body,  
//     user_id: req.session.user_id
//   })
//   .then(dbPostData => {
//     Post.findAll({
//       where: {
//         // use the ID from the session
//         user_id: req.session.user_id
//       },
//       attributes: [
//         'id',
//         'title',
//         'birthDate',
//         'passingDate',
//         'content',
//         'avatar',
//         'created_at',
//       ],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//         },
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ]
//     })
//     .then(dbPostData => {
//         // serialize data before passing to template
//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.render('dashboard', { posts, loggedIn: true });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
//   })
// })

router.post('/', withAuth, (req, res) => {
  upload(req, res, (err) => {
    if (err){
      res.status(500).json(err);
    } else {
      const obj = JSON.parse(JSON.stringify(req.body));
      console.log(obj)
      console.log('---------------------------------------')
      console.log(req.body.title)
      console.log('---------------------------------------')
      Post.create({
        title: req.body.title,
        birthDate: req.body.birthDate,
        passingDate: req.body.pasingDate,
        avatar: `images/${req.file.filename}`,
        content: req.body.body,  
        user_id: req.session.user_id
      })
      .then(dbPostData => {
        Post.findAll({
          where: {
            // use the ID from the session
            user_id: req.session.user_id
          },
          attributes: [
            'id',
            'title',
            'birthDate',
            'passingDate',
            'content',
            'avatar',
            'created_at',
          ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
          ]
        })
        .then(dbPostData => {
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
      }
    )}
  })
})
module.exports = router;