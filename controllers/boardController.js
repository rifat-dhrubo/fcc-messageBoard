const Board = require('../Models/Board');
const { asyncHandler } = require('../utils/handler');

const createBoard = async (req, res) => {
  console.log(req.body);
  const [err, data] = await asyncHandler(
    Board.create({ title: req.body.title })
  );

  return res.json({ err, data });
};

const showBoards = async (req, res) => {
  const [err, data] = await asyncHandler(
    Board.find()
      .lean()
      .exec()
  );

  return res.json({ err, data });
};

module.exports = { createBoard, showBoards };
