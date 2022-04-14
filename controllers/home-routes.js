const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Salads } = require('../models');
// add salads and choices routes
router.get('/', (req, res) => {
  Salads.findAll({
    attributes: [
      'id',
      'name',
      'ingredients',
      'filename',
    ]
  })
  .then(dbSaladData => {
    const salads = dbSaladData.map(salads => salads.get({ plain: true }))
    res.render('homepage', {
      salads,
      loggedIn: req.session.loggedIn

    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
    
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  // router.get('/signup', (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  //   }
  
  //   res.render('signup');
  // });

 


module.exports = router;