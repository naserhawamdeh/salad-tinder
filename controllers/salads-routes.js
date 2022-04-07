const router = require('express').Router();
const { Salads, Choices, User } = require('../models');
const sequelize = require('../config/connection');

// GET all salads
router.get('/', (req, res) => {
  Salads.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'name',
      'ingredients',
      'filename',
      // [sequelize.literal('(SELECT COUNT(*) FROM choices WHERE salads.id = choices.salads_id'), 'likes']
    ]
  })
  .then(dbSaladData => res.json(dbSaladData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET one salads
router.get('/:id', (req, res) => {
  Salads.findAll({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'ingredients',
      'filename',
      // [sequelize.literal('(SELECT COUNT(*) FROM choices WHERE salads.id = choices.salads_id'), 'likes']
    ]
  })
  .then(dbSaladData => res.json(dbSaladData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// CREATE add a new salad
router.post('/', (req, res) => {
  Salads.create({
    name: req.body.name,
    ingredients: req.body.ingredients,
    filename: req.body.filename
  })
  .then(dbSaladData => res.json(dbSaladData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// 'LIKE' a salad
// router.put('/like', (req, res) => {
//   Salads.like(req.body, { Choices })
//     .then(newLikeData => res.json(newLikeData))
//     .catch(err => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// 'DISLIKE' a salad
// router.put('/dislike', (req, res) => {
//   Salads.dislike(req.body, { Choices })
//     .then(newDislikeData => res.json(newDislikeData))
//     .catch(err => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// DELETE a salad
router.delete('/:id', (req, res) => {
  Salads.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbSaladData => {
    if (!dbSaladData) {
      res.status(404).json({ message: 'Salad not found.'});
      return;
    }
    res.json(dbSaladData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;