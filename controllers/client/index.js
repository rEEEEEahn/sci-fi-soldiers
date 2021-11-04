const router = require('express').Router();
const clientRouter = require('./client-router');
router.use('/', clientRouter);
module.exports = router;