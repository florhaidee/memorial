const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');
const { response } = require('express');

router.get('/', (req, res) => {
  console.log('======================');
  Comment.findAll({
    order: [['created_at', 'DESC']],
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.put('/:id', withAuth, (req, res) => {
  console.log("editing comment-------------------------------------------------> ", req.body);
  console.log("user_id logged in -------------------------------------------------> ", req.session.user_id);
  Comment.findOne({ 
    where: {
      id: req.params.id
    },
    attributes: ['user_id']
  })
  .then( responseData => {
    console.log("comment user_id --------------------------->",responseData.user_id)
    
    Comment.update(
      {
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No Comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;