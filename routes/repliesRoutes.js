const express = require('express');
const {
  getReplies,
  createReply,
  reportReply,
  deleteReply,
} = require('../controllers/replyController');

const router = express.Router();

router.get('/:board', getReplies);
router.post('/:board', createReply);
router.put('/:board', reportReply);
router.delete('/:board', deleteReply);

module.exports = router;
