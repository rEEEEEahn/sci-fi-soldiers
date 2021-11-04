const router = require('express').Router();
const professionalsRouter = require('./professionals-router');
router.use('/', professionalsRouter);
module.exports = router;