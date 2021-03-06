const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const upload = require('../utils/upload');
const { Post, User, Comment } = require('../models');
const { route } = require('./api');
const { body, validationResult } = require('express-validator');

//get all post
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
      res.render('dashboard', { posts, loggedIn: true, username: req.session.username });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get post by id
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
      
      if (req.session.loggedIn){
        post.sessionUser= {
          userId: req.session.user_id
        }
        console.log("post data----------------------------------------------------: ", post)
        // pass data to template
        res.render('edit-post', {
          post,
          loggedIn: req.session.loggedIn,
          username: req.session.username,
        });
      } else if(!req.session.loggedIn){
        console.log("loggedIn FALSE: post data----------------------------------------------------: ", post)
        res.render('edit-post', {
          post,
          loggedIn: false
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create post
router.post('/', withAuth,
  (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log("------------------------------------------------------------------------>", req.file);
        Post.create({
          title: req.body.title,
          birthDate: req.body.birthDate,
          passingDate: req.body.passingDate,
          avatar: `https://inmemoriamphotos.s3.us-west-2.amazonaws.com/${req.file.key}`,
          content: req.body.body,
          user_id: req.session.user_id
        })
          .then(response => {
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
                //res.render('dashboard', { posts, loggedIn: true });
                res.render("dashboard",  { posts, loggedIn: req.session.loggedIn, username: req.session.username })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json(err);
              });
          }
        )
      }
    })
    // }
  })

//edit a post
router.post('/edit/:id', withAuth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json(err);
    }
    if (!req.file) {
      Post.update({
        title: req.body.title,
        birthDate: req.body.birthDate,
        passingDate: req.body.passingDate,
        content: req.body.body,
        user_id: req.session.user_id
      },
        {
          where: {
            id: req.params.id
          }
        })
        .then(response => {
          Post.findOne({
            where: {

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
              //res.render("edit-post", { post, loggedIn: req.session.loggedIn, username: req.session.username })
              res.redirect("/dashboard")
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        })
    } else if (req.file) {
      Post.update({
        title: req.body.title,
        birthDate: req.body.birthDate,
        passingDate: req.body.passingDate,
        avatar: `https://inmemoriamphotos.s3.us-west-2.amazonaws.com/${req.file.key}`,
        content: req.body.body,
        user_id: req.session.user_id
      },
        {
          where: {
            id: req.params.id
          }
        })
        .then(response => {
          Post.findOne({
            where: {

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
              res.redirect("/dashboard")
              //res.render('edit-post', { post, loggedIn: req.session.loggedIn, username: req.session.username })
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        })
    }
  })
})

module.exports = router;