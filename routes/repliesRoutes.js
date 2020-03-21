const express = require('express');
const {
  createReply,
  reportReply,
  deleteReply,
} = require('../controllers/replyController');

const router = express.Router();

router.post('/:board', createReply);
router.put('/:board', reportReply);
router.delete('/:board', deleteReply);

module.exports = router;
