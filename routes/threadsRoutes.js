const express = require('express');
const {
  getThreads,
  createThread,
  reportThread,
  deleteThread,
} = require('../controllers/threadController');

const router = express.Router();

router.get('/:board', getThreads);
router.post('/:board', createThread);
router.put('/:board', reportThread);
router.delete('/:board', deleteThread);

module.exports = router;
