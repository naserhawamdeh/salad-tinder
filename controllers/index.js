const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const saladsRoutes = require('./salads-routes.js');

router.use('/users', userRoutes);
router.use('/salads', saladsRoutes);


module.exports = router;