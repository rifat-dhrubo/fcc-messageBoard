const Board = require('../Models/Board');
const Thread = require('../Models/Thread');
const { asyncHandler } = require('../utils/handler');

const createThread = async (req, res, next) => {
  const { board: title } = req.params;

  // eslint-disable-next-line camelcase
  const { text, delete_password, reported = false } = req.body;

  const [boardErr, boardData] = await asyncHandler(
    Board.findOne({ title })
      .lean()
      .exec()
  );

  const [threadErr, threadData] = await asyncHandler(
    Thread.findOneAndUpdate(
      { text },
      { board: boardData._id, text, delete_password, reported },
      { upsert: true, new: true }
    )
      .lean()
      .exec()
  );

  if (threadErr || boardErr) {
    res.json({ boardDataError: boardErr, threadDataError: threadErr });
    return;
  }

  res.json(threadData);
};
const deleteThread = async (req, res) => {};
const reportThread = async (req, res) => {};
const getThreads = async (req, res) => {};

module.exports = { getThreads, createThread, reportThread, deleteThread };
