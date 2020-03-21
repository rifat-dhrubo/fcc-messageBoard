const express = require('express');
const { createBoard, showBoards } = require('../controllers/boardController');

const router = express.Router();

router.get('/', showBoards);
router.post('/', createBoard);

module.exports = router;
