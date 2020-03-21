const Board = require('../Models/Board');
const Thread = require('../Models/Thread');
const Reply = require('../Models/Reply');
const { asyncHandler } = require('../utils/handler');

const createReply = async (req, res, next) => {
  const { board: title } = req.params;

  // eslint-disable-next-line camelcase
  const { text, delete_password, reported = false, thread_id } = req.body;

  const [boardErr, boardData] = await asyncHandler(
    Board.findOne({ title })
      .lean()
      .exec()
  );
  const [replyErr, replyData] = await asyncHandler(
    Reply.create({
      board: boardData._id,
      thread: thread_id,
      text,
      delete_password,
      reported,
    })
  );
  if (replyErr || boardErr) {
    res.json({ ...replyErr, ...boardErr });
    return;
  }

  res.json(replyData);
};
const deleteReply = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { thread_id, reply_id, delete_password } = req.body;

  const deleteFromReply = asyncHandler(
    Reply.findOneAndDelete({
      _id: reply_id,
      thread: thread_id,
      delete_password,
    })
      .lean()
      .exec()
  );

  const deleteFromThread = asyncHandler(
    Thread.findOneAndUpdate(
      { _id: thread_id },
      { $pull: { replies: reply_id } }
    )
      .lean()
      .exec()
  );

  const [err, data] = await asyncHandler(
    Promise.all([deleteFromReply, deleteFromThread])
  );

  if (err === null) {
    res.send('success');
  } else {
    res.json(err);
  }
};
const reportReply = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { thread_id, reply_id } = req.body;

  const [err, data] = await asyncHandler(
    Reply.findOneAndUpdate(
      { _id: reply_id, thread: thread_id },
      { reported: true },
      { new: true }
    )
      .lean()
      .exec()
  );

  if (err === null) {
    res.send('success');
  } else {
    res.json(err);
  }
};

module.exports = { createReply, reportReply, deleteReply };
