const Board = require('../Models/Board');
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
  console.log(replyErr);
  if (replyErr || boardErr) {
    res.json({ replyErr, boardErr });
    return;
  }

  res.json(replyData);
};
const deleteReply = async (req, res) => {};
const reportReply = async (req, res) => {};
const getReplies = async (req, res) => {};

module.exports = { getReplies, createReply, reportReply, deleteReply };
