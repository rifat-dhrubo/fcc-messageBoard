const mongoose = require('mongoose');
const Board = require('./Board');
const Reply = require('./Reply');

const threadSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Board,
      required: 'A thread must be posted to a board',
    },
    text: {
      type: String,
      required: 'A thread must have some texts',
    },
    reported: {
      type: Boolean,
      default: false,
    },
    delete_password: {
      type: String,
      required: 'A thread must have a delete password',
    },
    replies: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: Reply,
    },
  },
  {
    timestamps: { createdAt: 'created_on', updatedAt: 'bumped_on' },
  }
);

module.exports = mongoose.model('Thread', threadSchema);
