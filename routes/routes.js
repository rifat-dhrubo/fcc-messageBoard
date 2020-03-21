const express = require('express');

const repliesRouter = require('./repliesRoutes');
const threadsRouter = require('./threadsRoutes');
const boardsRouter = require('./borardsRouter');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs');
});
router.use('/api/boards', boardsRouter);
router.use('/api/threads', threadsRouter);
router.use('/api/replies', repliesRouter);

module.exports = router;
