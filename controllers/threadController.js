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
const getThreads = async (req, res, next) => {
  const { board: title } = req.params;

  const [boardErr, boardData] = await asyncHandler(
    Board.findOne({ title })
      .lean()
      .exec()
  );

  if (req.query.thread_id) {
    next();
    return;
  }

  const [err, data] = await asyncHandler(
    Thread.find({ board: boardData._id })
      .populate({
        path: 'replies',
        select: '-reported -delete_password',
        options: { sort: { bumped_on: -1 } },
        perDocumentLimit: 3,
      })
      .sort({ bumped_on: -1 })
      .limit(10)
      .lean()
      .exec()
  );
  if (boardErr || err) {
    res.json({ boardErr, err });
    return;
  }
  res.json({
    err,
    data,
  });
};

const getOneThread = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { thread_id } = req.query;

  const [err, data] = await asyncHandler(
    Thread.findById(thread_id).select(`-reported -delete_password`)
  );
  res.json({
    err,
    data,
  });
};

module.exports = {
  getThreads,
  createThread,
  reportThread,
  deleteThread,
  getOneThread,
};
