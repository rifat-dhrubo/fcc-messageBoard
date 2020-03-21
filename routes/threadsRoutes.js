const express = require('express');
const {
  getThreads,
  createThread,
  reportThread,
  deleteThread,
  getOneThread,
} = require('../controllers/threadController');

const router = express.Router();

router.get('/:board', getThreads, getOneThread);
router.post('/:board', createThread);
router.put('/:board', reportThread);
router.delete('/:board', deleteThread);

module.exports = router;
