const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const saladsRoutes = require('./salads-routes.js');

 router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/salads', saladsRoutes);



module.exports = router;