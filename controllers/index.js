const router = require('express').Router();
const homeRouter = require('./home-router');
const apiRouter = require('./api');
const professionalsRouter = require('./professional');
router.use('/', homeRouter);
router.use('/api', apiRouter);
router.use('/professionals', professionalsRouter);
module.exports = router;
