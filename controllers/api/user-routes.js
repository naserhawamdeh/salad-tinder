const router = require('express').Router();

const { User, Choices, Salads } = require('../../models');


// GET all users
// http://localhost:3001/users
router.get('/', (req, res) => {
  User.findAll({
    // removes password from results

    attributes: { exclude: ['password'] },
    include: {
      model: Salads,
      attributes: ['id', 'filename'],
      include: {
        model: Salads,
        attributes: ['name'],
        through: Choices,
        as: 'likes'
      }
    }

  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single user
// http://localhost:3001/users/<id>
router.get('/:id', (req, res) => {
  User.findOne({
    // removes password from results
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: "User not found."});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST create a new user
// http://localhost:3001/users

router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch(err) {
      console.log(err);
      res.status(500).json(err);
  }

});

// POST (authenticate user by email/password)
// **MUST HAVE 'EMAIL' AND 'PASSWORD' FIELDS TO OPERATE CORRECTLY
// http://localhost:3001/users/login
router.post('/login', (req, res) => {
    // check for email address associated with a user
  User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'Email address not found.' });
        return;
      }
      // Verify user password
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password.' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json({ user: dbUserData, message: 'Login successful.' });
      });
      
    });  
  });

  // LOGOUT
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });


// PUT update a user
// http://localhost:3001/users/<id>
router.put('/:id', (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a user
// http://localhost:3001/users/<id>
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;